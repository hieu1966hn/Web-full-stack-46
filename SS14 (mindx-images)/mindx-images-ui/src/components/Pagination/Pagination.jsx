import { Pagination as BPagination } from 'react-bootstrap';
import { useMemo } from 'react';

function Pagination({ 
  active, 
  total, 
  pageSize = 4, 
  onChangePage 
}) {
  // bản chất để tính toán ra 1 giá trị nào đó
  // chạy trước render
  // chỉ chạy khi dep thay đổi
  // giá trị maxPage chỉ thay đổi khi total hoặc pageSize thay đổi

  const maxPage = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  // mỗi một lần render đều tính toán lại max page
  // không tối ưu ở chỗ nếu total, pageSize ko đổi thì ko cần tính toán
  // const maxPage = Math.ceil(total / pageSize);
  
  const renderItems = () => {
    let items = [];
    for (let number = 1; number <= maxPage; number++) {
      items.push(
        <BPagination.Item 
          key={number} 
          active={number === active}
          onClick={() => onChangePage(number)}
        >
          {number}
        </BPagination.Item>
      );
    }
    return items;
  };

  return <BPagination>{renderItems()}</BPagination>;
}

export default Pagination;