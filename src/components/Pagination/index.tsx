import './Pagination.css';
import { IPaginationProps } from '../../types';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled,
}: IPaginationProps) {
  const getVisiblePages = () => {
    const pages = [];

    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='pagination'>
      <div>
        {visiblePages.map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === 'number' ? onPageChange(page) : null
            }
            disabled={page === '...' || disabled || page === currentPage}
            className={page === currentPage ? '' : 'active'}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
