body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fafafa;
  color: #222;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1100px;
  margin: 20px auto;
  padding: 10px;
}

h2 {
  color: #003366;
  margin-bottom: 12px;
}

/* Botones */
.btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.btn:hover {
  background-color: #217dbb;
}

/* Tabla */
.table-wrapper {
  overflow-x: auto;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
th, td {
  padding: 8px 10px;
  border: 1px solid #ddd;
  text-align: left;
  vertical-align: middle;
  font-size: 14px;
}
th {
  background-color: #f0f0f0;
}

/* Inputs */
input[type="text"], input[type="color"], select {
  padding: 6px 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/* Modal */
.modal-bg {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-bg.active {
  display: flex;
}
.modal {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

/* Responsive */
@media (max-width: 768px) {
  table, th, td {
    font-size: 12px;
  }
}
