import { useState } from 'react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Modal from '../components/Modal';

function Performance() {
  // Данные успеваемости (вместо API пока используем статику)
  const [performanceData, setPerformanceData] = useState([
    { id: 1, student_name: 'Иван Иванов', course_name: 'Математика', score: 95, date: '2024-01-10' },
    { id: 2, student_name: 'Мария Смирнова', course_name: 'Физика', score: 89, date: '2024-01-11' },
    { id: 3, student_name: 'Петр Петров', course_name: 'Химия', score: 76, date: '2024-01-12' },
    { id: 4, student_name: 'Анна Кузнецова', course_name: 'Биология', score: 82, date: '2024-01-13' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Открытие модального окна для редактирования
  const openModal = (record) => {
    setCurrentRecord(record);
    setModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setCurrentRecord(null);
    setModalOpen(false);
  };

  // Сохранение изменений
  const saveChanges = () => {
    // Обновляем данные успеваемости
    setPerformanceData((prevData) =>
      prevData.map((record) =>
        record.id === currentRecord.id ? currentRecord : record
      )
    );
    closeModal();
  };

  // Фильтрация записей по поиску
  const filteredData = performanceData.filter(
    (item) =>
      item.student_name.toLowerCase().includes(search.toLowerCase()) ||
      item.course_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Успеваемость студентов</h2>

      {/* Поле поиска */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Таблица с данными успеваемости */}
      <Table
        data={filteredData}
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'student_name', label: 'Имя студента' },
          { key: 'course_name', label: 'Курс' },
          { key: 'score', label: 'Оценка' },
          { key: 'date', label: 'Дата' },
        ]}
        actions={[
          {
            label: 'Редактировать',
            onClick: openModal,
          },
        ]}
      />

      {/* Модальное окно редактирования */}
      <Modal
        isOpen={isModalOpen}
        title="Редактировать успеваемость"
        onClose={closeModal}
        onSubmit={saveChanges}
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm">Имя студента</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={currentRecord?.student_name || ''}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, student_name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Курс</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={currentRecord?.course_name || ''}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, course_name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Оценка</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              value={currentRecord?.score || ''}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, score: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm">Дата</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={currentRecord?.date || ''}
              onChange={(e) =>
                setCurrentRecord({ ...currentRecord, date: e.target.value })
              }
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Performance;
