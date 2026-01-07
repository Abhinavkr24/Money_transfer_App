const PageWrapper = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
    {children}
  </div>
);

export default PageWrapper;