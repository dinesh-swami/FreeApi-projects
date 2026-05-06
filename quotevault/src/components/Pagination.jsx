const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination">
      {Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={i}
            className={page === pageNum ? 'active' : ''}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;