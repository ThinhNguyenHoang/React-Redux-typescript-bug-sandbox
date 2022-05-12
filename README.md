# Cấu trúc của Source Code FrontEnd:

## Craete security certificates for local development 
https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/

## fake_rest_serve:
Chứa database giả và sử dụng json-server để mock các api (Khi backend chưa có)
"""
    * Hướng dẫn chạy server fake để tự test api trước:
    * https://www.npmjs.com/package/json-server
"""
## src:
Thư mục source code chính chứa toàn bộ code frontend
### assest: 
Chứa các tài nguyên tĩnh như hình ảnh, icon, vector,...
### components: 
Chứa các component của Ant Design (Nên là các component dùng chung. )
### hooks: 
Các custom hooks 
### locales: 
Thực hiện đa ngôn ngữ cho hệ thống với i18n: 
    1. Khai key trong object base_key ở constants.js 
    2. Dịch cho key với ngôn ngữ tương ứng ở folder tương ứng. 
### pages: 
Chứa các trang của app. Mỗi trang là tổng hợp bộ các component ở components 
### routes: 
Định nghĩa route nào thì render page nào 
### recoil: 
Cái này không biết nên tổ chức như nào :). Có khi nên nhúng luôn atom vào các page :V 
### utils: 
Các hàm utils thông dụng parse response, gắn header, quăng lỗi network, phân mảng, wrapper cho các lời gọi axios,...   


# Hướng dẫn chạy để start server với yarn
1. Cài yarn (nếu chưa có)
   
        npm install yarn 
   
2. Chạy yarn để install các thư viện trong package.json 
   
        yarn 
   
3. Khơi động front end 
   
       yarn start 
   

# React-Redux-typescript-bug-sandbox
# React-Redux-typescript-bug-sandbox
# React-Redux-typescript-bug-sandbox
# React-Redux-typescript-bug-sandbox
