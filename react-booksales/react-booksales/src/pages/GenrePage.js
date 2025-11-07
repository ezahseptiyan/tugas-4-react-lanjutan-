import React, { useEffect, useState } from 'react';
const API_BASE = 'http://127.0.0.1:8000/api';

export default function GenrePage(){
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const token = JSON.parse(localStorage.getItem('rb_user'))?.token;

  const headers = token ? { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type':'application/json' };

  const fetchGenres = async ()=>{
    try{
      const r = await fetch(`${API_BASE}/genres`, { headers });
      const data = await r.json();
      setGenres(data);
    }catch(e){ console.error(e); }
  };

  useEffect(()=>{ fetchGenres(); },[]);

  const createGenre = async (e)=>{
    e.preventDefault();
    try{
      const r = await fetch(`${API_BASE}/genres`, { method:'POST', headers, body: JSON.stringify({ name }) });
      if(!r.ok) throw new Error('failed');
      setName(''); fetchGenres();
    }catch(e){ alert('Gagal tambah genre'); }
  };

  const startEdit = (g)=>{ setEditId(g.id); setEditName(g.name); };
  const cancelEdit = ()=>{ setEditId(null); setEditName(''); };
  const doUpdate = async (e)=>{
    e.preventDefault();
    try{
      const r = await fetch(`${API_BASE}/genres/${editId}`, { method:'PUT', headers, body: JSON.stringify({ name: editName }) });
      if(!r.ok) throw new Error('failed');
      cancelEdit(); fetchGenres();
    }catch(e){ alert('Gagal update'); }
  };
  const doDelete = async (id)=>{
    if(!window.confirm('Yakin mau hapus?')) return;
    try{
      const r = await fetch(`${API_BASE}/genres/${id}`, { method:'DELETE', headers });
      if(!r.ok) throw new Error('failed');
      fetchGenres();
    }catch(e){ alert('Gagal hapus'); }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Manage Genres</h2>
        <form onSubmit={editId? doUpdate : createGenre} style={{marginTop:12}}>
          <div className="form-field">
            <label className="small">{editId ? 'Edit genre' : 'Nama genre'}</label>
            <input value={editId? editName: name} onChange={e=> editId? setEditName(e.target.value) : setName(e.target.value)} required />
          </div>
          <div>
            <button type="submit">{editId? 'Simpan' : 'Tambah'}</button>
            {editId && <button type="button" onClick={cancelEdit} style={{marginLeft:8}}>Batal</button>}
          </div>
        </form>
        <hr style={{margin:'12px 0'}}/>
        <div>
          {genres.length===0 && <p className="small">Tidak ada genre.</p>}
          {genres.map(g=> (
            <div className="list-item" key={g.id}>
              <div>{g.name}</div>
              <div>
                <button onClick={()=> startEdit(g)} style={{marginRight:8}}>Edit</button>
                <button onClick={()=> doDelete(g.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
