function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6 border-b border-gray-200">
      <div className="flex justify-center items-center">
        <img
          src="https://apps3proxy.mosmetro.tech/webapp-mosmetro/mm-logo-red.svg"
          alt="Логотип"
          className="h-10"
          style={{ marginRight: '20px' }}
        />
        <h1 className="text-2xl font-bold text-red-600">Профессиональная переподготовка</h1>
      </div>
    </header>
  );
}

export default Header;
