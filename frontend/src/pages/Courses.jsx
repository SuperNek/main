import { useState } from 'react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

function Courses() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Математика', duration: '3 месяца', teacher: 'Иван Иванов' },
    { id: 2, name: 'Физика', duration: '4 месяца', teacher: 'Мария Смирнова' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  const openModal = (course) => {
    setCurrentCourse(course);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentCourse(null);
    setModalOpen(false);
  };

  const saveCourse = () => {
    // Сохранение данных (пока что закрываем модалку)
    closeModal();
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Управление курсами</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <button
        onClick={() => openModal(null)}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Добавить курс
      </button>
      <Table
        data={filteredCourses}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Название' },
          { key: 'duration', label: 'Длительность' },
          { key: 'teacher', label: 'Преподаватель' },
        ]}
      />
      <Modal
        isOpen={isModalOpen}
        title={currentCourse ? 'Редактировать курс' : 'Добавить курс'}
        onClose={closeModal}
        onSubmit={saveCourse}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm">Название курса</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Введите название"
            />
          </div>
          <div>
            <label className="block text-sm">Длительность</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Введите длительность"
            />
          </div>
          <div>
            <label className="block text-sm">Преподаватель</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Введите имя преподавателя"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Courses;
