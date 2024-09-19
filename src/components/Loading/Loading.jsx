
const Loading = () => (
  <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
    <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16"></div>
    <style jsx>{`
      .loader {
        border-top-color: transparent;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loading;
