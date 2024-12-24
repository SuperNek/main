import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import Employees from './Employees';
import Courses from './Courses';
import Schedule from './Schedule';
import Performance from './Performance';

function AdminPanel() {
  const [selectedSection, setSelectedSection] = useState('employees');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Шапка */}
      <Header />

      {/* Основной блок */}
      <div className="flex flex-1">
        <Sidebar
          onSelectSection={setSelectedSection}
          selectedSection={selectedSection}
        />

        <main className="flex-1 p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatsCard title="Сотрудники" value={120} />
            <StatsCard title="Курсы" value={15} />
            <StatsCard title="Запланированные занятия" value={20} />
          </div>

          {/* Динамический контент */}
          {selectedSection === 'employees' && <Employees />}
          {selectedSection === 'courses' && <Courses />}
          {selectedSection === 'schedule' && <Schedule />}
          {selectedSection === 'performance' && <Performance />}
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
