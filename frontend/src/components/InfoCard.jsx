import PropTypes from 'prop-types';

function InfoCard({ title, description }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-md border">
      <h3 className="text-lg font-semibold mb-2 text-red-600">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default InfoCard;