import React, { useEffect, useState } from 'react';
const API_BASE = 'http://127.0.0.1:8000/api';

export default function AuthorPage(){
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ name:'', country:'', birth_year:'' });
  const [editId, setEditId] = useState(null);
  const token = JSON.parse(localStorage.getItem('rb_user'))?.token;
  const headers = token ? { 'Content-Type':'application/json', 'Authorization': `Bearer ${token}` } : { 'Content-Type':'application/json' };

  const fetchAuthors = async ()=>{
    try{
      const r = await fetch(`${API_BASE}/authors`, { headers });
      const data = await r.json();
      setAuthors(data);
    }catch(e){ console.error(e); }
  };

  useEffect(()=>{ fetchAuthors(); },[]);

  const createAuthor = async (e)=>{
    e.preventDefault();
    try{
      const r = await fetch(`${API_BASE}/authors`, { method:'POST', headers, body: JSON.stringify(form) });
      if(!r.ok) throw new Error('failed');
      setForm({ name:'', country:'', birth_year:'' });
      fetchAuthors();
    }catch(e){ alert('Gagal tambah author'); }
  };

  const startEdit = (a)=>{ setEditId(a.id); setForm({ name:a.name, country:a.country, birth_year:a.birth_year }); };
  const cancelEdit = ()=>{ setEditId(null); setForm({ name:'', country:'', birth_year:'' }); };
  const doUpdate = async (e)=>{
    e.preventDefault();
    try{
      const r = await fetch(`${API_BASE}/authors/${editId}`, { method:'PUT', headers, body: JSON.stringify(form) });
      if(!r.ok) throw new Error('failed');
      cancelEdit(); fetchAuthors();
    }catch(e){ alert('Gagal update'); }
  };
  const doDelete = async (id)=>{
    if(!window.confirm('Yakin mau hapus?')) return;
    try{
      const r = await fetch(`${API_BASE}/authors/${id}`, { method:'DELETE', headers });
      if(!r.ok) throw new Error('failed');
      fetchAuthors();
    }catch(e){ alert('Gagal hapus'); }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Manage Authors</h2>
        <form onSubmit={editId? doUpdate : createAuthor} style={{marginTop:12}}>
          <div className="form-field">
            <label className="small">Nama</label>
            <input value={form.name} onChange={e=> setForm({...form, name:e.target.value})} required />
          </div>
          <div className="form-field">
            <label className="small">Country</label>
            <input value={form.country} onChange={e=> setForm({...form, country:e.target.value})} />
          </div>
          <div className="form-field">
            <label className="small">Birth Year</label>
            <input value={form.birth_year} onChange={e=> setForm({...form, birth_year:e.target.value})} type="number" />
          </div>
          <div>
            <button type="submit">{editId? 'Simpan' : 'Tambah'}</button>
            {editId && <button type="button" onClick={cancelEdit} style={{marginLeft:8}}>Batal</button>}
          </div>
        </form>
        <hr style={{margin:'12px 0'}}/>
        <div>
          {authors.length===0 && <p className="small">Tidak ada author.</p>}
          {authors.map(a=> (
            <div className="list-item" key={a.id}>
              <div>
                <strong>{a.name}</strong><br/>
                <span className="small">{a.country} — {a.birth_year}</span>
              </div>
              <div>
                <button onClick={()=> startEdit(a)} style={{marginRight:8}}>Edit</button>
                <button onClick={()=> doDelete(a.id)}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
