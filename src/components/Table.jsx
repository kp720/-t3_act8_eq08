import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProducts, getCategories, addProduct, updateProduct, deleteProduct } from '../services/api';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export const Table = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getProducts(page, limit, search, category);
        setProducts(data.products);
      } catch (error) {
        Toast.fire({ icon: 'error', title: 'Error al cargar los datos' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, limit, search, category]);

  const updateURL = (newParams) => {
    const current = Object.fromEntries([...searchParams]);
    setSearchParams({ ...current, ...newParams });
  };

  const handleAdd = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo Registro',
      background: '#0f172a',
      color: 'white',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Nombre del producto">
        <input id="swal-price" class="swal2-input" type="number" placeholder="Precio">
      `,
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      preConfirm: () => {
        const title = document.getElementById('swal-title').value;
        const price = document.getElementById('swal-price').value;
        if (!title || !price) return Swal.showValidationMessage('Campos incompletos');
        return { title, price: parseFloat(price) };
      }
    });

    if (formValues) {
      try {
        const newProd = await addProduct(formValues);
        setProducts([{ ...newProd, ...formValues }, ...products]);
        Toast.fire({ icon: 'success', title: 'Agregado correctamente' });
      } catch (err) {
        Toast.fire({ icon: 'error', title: err.message });
      }
    }
  };

  const handleEdit = async (prod) => {
    const { value: newTitle } = await Swal.fire({
      title: 'Editar Producto',
      input: 'text',
      inputValue: prod.title,
      background: '#0f172a',
      color: 'white',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6'
    });

    if (newTitle && newTitle !== prod.title) {
      try {
        await updateProduct(prod.id, { title: newTitle });
        setProducts(products.map(p => p.id === prod.id ? { ...p, title: newTitle } : p));
        Toast.fire({ icon: 'success', title: 'Actualizado correctamente' });
      } catch (err) {
        Toast.fire({ icon: 'error', title: err.message });
      }
    }
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: '¿Eliminar registro?',
      text: title,
      icon: 'warning',
      background: '#0f172a',
      color: 'white',
      showCancelButton: true,
      confirmButtonColor: '#ef4444'
    });

    if (result.isConfirmed) {
      try {
        if (id <= 194) await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        Toast.fire({ icon: 'success', title: 'Eliminado correctamente' });
      } catch (err) {
        Toast.fire({ icon: 'error', title: err.message });
      }
    }
  };

  const styles = {
    container: { backgroundColor: '#020617', padding: '30px', color: 'white', minHeight: '100vh' },
    controls: { display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' },
    input: { padding: '10px 15px', borderRadius: '6px', backgroundColor: '#0f172a', color: 'white', border: '1px solid #1e293b' },
    btn: (bg) => ({ backgroundColor: bg, color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }),
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '15px' },
    th: { padding: '15px', textAlign: 'left', borderBottom: '2px solid #1e293b', color: '#94a3b8' },
    td: { padding: '15px', borderBottom: '1px solid #1e293b' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.controls}>
        <input type="text" placeholder="Buscar..." value={search} onChange={(e) => updateURL({ search: e.target.value, page: 1 })} style={styles.input} />
        <select value={category} onChange={(e) => updateURL({ category: e.target.value, page: 1, search: '' })} style={styles.input}>
          <option value="">Todas las categorías</option>
          {categories.map((c, i) => <option key={i} value={c.slug || c}>{c.name || c}</option>)}
        </select>
        <button onClick={handleAdd} style={styles.btn('#22c55e')}>+ Agregar</button>
      </div>

      {loading ? <p>Cargando datos...</p> : (
        <table style={styles.table}>
          <thead>
            <tr><th style={styles.th}>ID</th><th style={styles.th}>Producto</th><th style={styles.th}>Precio</th><th style={styles.th}>Acciones</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={styles.td}>#{p.id}</td>
                <td style={styles.td}>{p.title}</td>
                <td style={styles.td}>${p.price}</td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(p)} style={styles.btn('#3b82f6')}>Editar</button>
                    <button onClick={() => handleDelete(p.id, p.title)} style={styles.btn('#ef4444')}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ ...styles.controls, justifyContent: 'space-between', marginTop: '20px' }}>
        <select value={limit} onChange={(e) => updateURL({ limit: e.target.value, page: 1 })} style={styles.input}>
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
          <option value="50">50 por página</option>
        </select>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button disabled={page <= 1} onClick={() => updateURL({ page: page - 1 })} style={styles.btn(page <= 1 ? '#1e293b' : '#3b82f6')}>Anterior</button>
          <span style={{ padding: '10px' }}>Página {page}</span>
          <button disabled={products.length < limit} onClick={() => updateURL({ page: page + 1 })} style={styles.btn(products.length < limit ? '#1e293b' : '#3b82f6')}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};