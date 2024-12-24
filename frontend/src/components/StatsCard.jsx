import PropTypes from 'prop-types';

function StatsCard({ title, value }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-md text-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-red-600">{value}</p>
    </div>
  );
}

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default StatsCard;
