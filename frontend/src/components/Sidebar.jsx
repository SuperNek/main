import PropTypes from 'prop-types';

function Sidebar({ onSelectSection, selectedSection }) {
    const menuItems = [
      { id: 'employees', label: 'Сотрудники' },
      { id: 'courses', label: 'Курсы' },
      { id: 'schedule', label: 'Расписание' },
      { id: 'performance', label: 'Успеваемость' },
    ];
  
    return (
      <aside className="w-64 bg-white h-screen border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-6">Администратор</h2>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full text-left p-2 rounded-md ${
                    selectedSection === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    );
  }
  
Sidebar.propTypes = {
  onSelectSection: PropTypes.func.isRequired,
  selectedSection: PropTypes.string.isRequired,
};

export default Sidebar;
