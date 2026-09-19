import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../services/studentService';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();

  const lastStudentElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      try {
        const response = await studentService.getAll(page);
        const newStudents = response.data.data;
        const currentPage = response.data.current_page;
        const lastPage = response.data.last_page;

        setStudents((prev) => (page === 1 ? newStudents : [...prev, ...newStudents]));
        setHasMore(currentPage < lastPage);
      } catch (err) {
        console.error('Error loading students:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await studentService.delete(id);
        setStudents((prev) => prev.filter((s) => s.id !== id));
      } catch (err) {
        alert('Failed to delete student.');
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',       
      justifyContent: 'center',   
      minHeight: '100vh',
      padding: '10px',
      width: '100%', maxWidth: '2000px'
    }}>
      <h2>Student List ({students.length} Loaded)</h2>
      <Link to="/register" style={{ marginBottom: '15px', display: 'inline-block' }}>
        + Register New Student
      </Link>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const isLastElement = students.length === index + 1;
            return (
              <tr key={`${student.id}-${index}`} ref={isLastElement ? lastStudentElementRef : null}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.school_class?.name || 'N/A'}</td>
                <td>
                  <Link to={`/edit/${student.id}`} style={{ marginRight: '10px' }}>Edit</Link>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {loading && <p style={{ textAlign: 'center' }}>Loading more students...</p>}
      {!hasMore && <p style={{ textAlign: 'center' }}>All students loaded.</p>}
    </div>
  );
};

export default StudentListPage;