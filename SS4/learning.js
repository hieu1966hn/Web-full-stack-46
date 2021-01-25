/*
    Mô hình chạy web => Client và Server

    Client: HTML, CSS, JS => Chrome, Firefox, ... trên máy tất cả mọi người
    Server: Java, PHP, C#, NodeJS => máy tính đặt tại một chỗ nào đó trên thế giới

    * Bị nhầm
    Cùng một ngôn ngữ, cùng một máy => giao tiếp bắt buộc qua HTTP request chứ không phải
    module của JS

    * NodeJS
    Môi trường chạy JS trên máy tính (LTS) => npm
    NPM => kéo thư viện về từ trên mạng => npm i
    Tạo qua npm init
    3 trường hợp require
    require code tự viết (ở file JS khác)
    require
*/


//////////////////////  review day4
/**
 * Express là framework để xây dựng backend (ngoài ExpressJS ra thì con rất nhiều các nodejs framework khác như NestJS,\
 *  SailJS,...)
 *
 * Bản chất xây dựng web app server là gì ??
 * => Chạy 1 ứng dụng trong máy tính (thiết bị điện tử có thể có hệ điều hành)
 * => Tạo 1 service run ở port nào đó (8080)
 * => Lắng nghe những thông tin client gọi lên.
 * 
 * 
 * Express define các router
 * + Method: GET, POST, PUT, DELETE,...
 * + url: '/abc', '/xyz'
 * + callback để trả dữ liệu => String, object, Json, file html, css, js,.....
 * 
 * 
 * Express define static folder
 * => Cung cấp một cơ chế để xác định file tĩnh (html, css, image, js,..) một cách dễ dàng
 * 
 * Express cung cấp mọi người 1  cơ chế để đọc thong tin (data client) gửi lên
 * + app.use(express.urlencoded({extended: true}));
 * + app.use(express.json());
 * 
 * 
 * Chức năng web
 *  + Chức năng tĩnh (JS nomal, thao tác với dom): hiệu ứng, chạy animation, .. (các chức năng mà không cần lưu kết quả [f5 => is gone])
 *  + Chức năng động: có thao tác với server
 * 'I. Xác định được là khi nào gọi lên server
 *      1. Load trang first time
 *      2. Trong các event về DOM, (với mouse, keybroad, ... )
 * 
 *  II. Gọi lên server một HTTP request (fetch, ajax, của jquery, axios)
 * 
 *  III. Code chức năng trên server => đọc thông tin client => và trả về thông tin client
 * 
 *  IV. Client đọc được và thao tác với dom để kết quả
 */


 /** 
  * 
  */