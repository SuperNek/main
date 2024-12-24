import { useState } from 'react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

function Schedule() {
  const [schedule, setSchedule] = useState([
    { id: 1, course: 'Математика', teacher: 'Иван Иванов', date: '2024-01-10' },
    { id: 2, course: 'Физика', teacher: 'Мария Смирнова', date: '2024-01-12' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  const openModal = (record) => {
    setCurrentSchedule(record);
    setModalOpen(true);
  };

  const closeModal = () => {
    setCurrentSchedule(null);
    setModalOpen(false);
  };

  const saveSchedule = () => {
    // Сохранение данных (пока что закрываем модалку)
    closeModal();
  };

  const filteredSchedule = schedule.filter(
    (item) =>
      item.course.toLowerCase().includes(search.toLowerCase()) ||
      item.teacher.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Планирование расписания</h2>
      <SearchBar search={search} setSearch={setSearch} />
      <button
        onClick={() => openModal(null)}
        className="mb-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Добавить занятие
      </button>
      <Table
        data={filteredSchedule}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'course', label: 'Курс' },
          { key: 'teacher', label: 'Преподаватель' },
          { key: 'date', label: 'Дата' },
        ]}
      />
      <Modal
        isOpen={isModalOpen}
        title={currentSchedule ? 'Редактировать запись' : 'Добавить занятие'}
        onClose={closeModal}
        onSubmit={saveSchedule}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm">Курс</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Введите название курса"
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
          <div>
            <label className="block text-sm">Дата</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Schedule;
