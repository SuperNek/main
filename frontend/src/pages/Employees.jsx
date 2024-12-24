import { useEffect, useState } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../api/employee'; // Импорт функций API
import { updateRole } from '../api/auth'; // Импорт API-функции для обновления роли
import InputField from '../components/InputField';
import Button from '../components/Button';
import Modal from '../components/Modal';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    name: '',
    position: '',
    department: '',
    contactInfo: '',
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Вы не авторизованы. Перенаправляем на страницу входа.');
        window.location.href = '/'; // Перенаправление на страницу входа
        return;
      }
  
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Ошибка при загрузке сотрудников:', error);
      }
    };
  
    checkAuth();
  }, []);

  const handleSearch = () => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEmployees(filtered);
  };

  const handleEdit = (employee) => {
    setModalData(employee);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (modalData.id) {
        // Обновление сотрудника
        await updateEmployee(modalData.id, modalData);
      } else {
        // Создание нового сотрудника
        await createEmployee(modalData);
      }
      setIsModalOpen(false);
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Ошибка при сохранении сотрудника:', error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
      alert('Сотрудник успешно удалён.');
    } catch (error) {
      console.error('Ошибка при удалении сотрудника:', error);
      alert('Ошибка при удалении сотрудника.');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await updateRole(userId, newRole, token); // Вызов API-функции для обновления роли
      alert('Роль успешно обновлена.');
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.userId === userId ? { ...emp, role: newRole } : emp
        )
      );
    } catch (error) {
      console.error('Ошибка при изменении роли:', error);
      alert('Ошибка при изменении роли.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData({
      id: null,
      name: '',
      position: '',
      department: '',
      contactInfo: '',
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Сотрудники</h2>
      <div className="flex space-x-2 mb-4">
        <InputField
          id="search"
          label="Поиск"
          name="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введите имя сотрудника"
        />
        <Button className="px-4 py-2 text-sm" onClick={handleSearch}>
          Найти
        </Button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Имя</th>
            <th className="border border-gray-300 p-2">Должность</th>
            <th className="border border-gray-300 p-2">Отдел</th>
            <th className="border border-gray-300 p-2">Роль</th>
            <th className="border border-gray-300 p-2">Контакты</th>
            <th className="border border-gray-300 p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 p-2">{employee.name}</td>
              <td className="border border-gray-300 p-2">{employee.position}</td>
              <td className="border border-gray-300 p-2">{employee.department}</td>
              <td className="border border-gray-300 p-2">
                <select
                  className="border p-2 rounded"
                  value={employee.role || 'student'}
                  onChange={(e) => handleRoleChange(employee.userId, e.target.value)}
                >
                  <option value="admin">Администратор</option>
                  <option value="instructor">Преподаватель</option>
                  <option value="student">Ученик</option>
                </select>
              </td>
              <td className="border border-gray-300 p-2">{employee.contactInfo}</td>
              <td className="border border-gray-300 p-2 space-x-2">
                <Button className="px-4 py-2 text-sm" onClick={() => handleEdit(employee)}>
                  Редактировать
                </Button>
                <Button
                  className="px-4 py-2 text-sm"
                  onClick={() => handleDelete(employee.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно */}
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="space-y-4">
            <InputField
              id="name"
              label="Имя"
              name="name"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
            />
            <InputField
              id="position"
              label="Должность"
              name="position"
              value={modalData.position}
              onChange={(e) => setModalData({ ...modalData, position: e.target.value })}
            />
            <InputField
              id="department"
              label="Отдел"
              name="department"
              value={modalData.department}
              onChange={(e) => setModalData({ ...modalData, department: e.target.value })}
            />
            <InputField
              id="contactInfo"
              label="Контакты"
              name="contactInfo"
              value={modalData.contactInfo}
              onChange={(e) => setModalData({ ...modalData, contactInfo: e.target.value })}
            />
            <Button className="w-full" onClick={handleSave}>
              Сохранить
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Employees;
