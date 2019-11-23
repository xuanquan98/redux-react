1.REDUX la gi ?
 - Redux js là một thư viện Javascript giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng.
2.Nguyên lí
  Redux được xây dựng dựa trên 3 nguyên lý:
   - Nguồn dữ liệu tin cậy duy nhất: State của toàn bộ ứng được chứa trong một object tree nằm trong Store duy nhất
   - Trạng thái chỉ được phép đọc: Cách duy nhất để thay đổi State của ứng dụng là phát một Action (là 1 object mô tả những gì xảy ra)
   - Thay đổi chỉ bằng hàm thuần túy: Để chỉ ra cách mà State được biến đổi bởi Action chúng ta dùng các pure function gọi là Reducer
3.Cấu trúc
 - Action:  Là nơi mang các thông tin dùng để gửi từ ứng dụng đến Store. Các thông tin này là 1 object mô tả những gì đã xảy ra.
 - Reducer: Là nơi xác định State thay đổi như thế nào.
 - Store: Là nơi quản lý State, cho phép truy cập State qua getState(), update State qua dispatch(action), đăng kí listener qua subscribe(listener)
 - View: Hiển thị dữ liệu được cung cấp bởi Store
4.Data flow
 - The Action creators: tạo ra một action là formated object chứa type và thông tin của action đó. Type thường sẽ là một hằng số được định nghĩa trước
 - The Store:  chỉ quản lý trạng thái của State tree. Khi nhận được Action sẽ đi hỏi The reducers xem State sẽ thay đổi ra sao chứ không làm.
 - The Reducer
 - Root Reducer: chịu trách nhiệm cắt ra State cần thay đổi dựa trên keys mà The Store gửi cho và đưa nó cho Reducer biết cách xử lý.
 - The views: smart and dumb components:
  + Smart component: có thể gọi là containers(Containers là những component giao tiếp với Redux thông qua connect() của react-redux.)
  + Dumb components: có thể gọi là components(Là những component thông thường, chúng không giao tiếp với Redux, chỉ nhận giá trị và thao tác thông qua props.)
 - The view layer binding: Để The Store giao tiếp đc với The views, chúng ta cần một ai đó kết nối họ lại với nhau, và chúng ta có The view layer binding, với React anh ta tên là react-redux.
 - The root component:  Là những component cao nhất của hệ thống component.
 
 data flow: 
 - Setup: Các bộ phận cần được nối với nhau. Việc này xảy ra lần đầu vào app.
  B1:  Root component tạo ra Store chỉ cho Store dùng Root Reducer nào thông qua createStore(). 
       Root Reducer tập hợp reducer thông qua combineReducers()
  B2:  Root component bao các subcomponents với provider component (The view layer binding) và tạo kết nối giữa Store với các Provider.
       Provider tạo ra 1 mạng cơ bản để cập nhật các components. Smart Components kết nối vào mạng bằng connect(), điều này đảm bảo họ nhận được cập nhật State.
  B3: Để các Dump Components làm việc với Action dễ dàng hơn, các Smart Components có thể chuẩn bị các action callback thông qua bindActionCreators()
      Các Actions sẽ được tự động gửi đi sau khi nó được định dạng.
 - Flow: 
  B1: The View yêu cầu 1 action. Action Creator định dạng (format) yêu cầu và gửi lại the View
  B2: Action được gửi tự động (nếu bindActionCreators() đã được chuẩn bị) hoặc The View sẽ gửi tới The Store 
  B3: The Store nhận Action sau đó gửi State tree hiện tại và Action cho Root Reducer.
  B4: Root Reducer chia State ra thành nhiều phần và gửi cho từng subreducers biết cách xử lý chúng.
  B5: Subreducers tạo ra 1 bản copy từ phần nhận được và thay đổi trên bản copy. Sau đó gửi lại bản copy cho Root Reducer
  B6: Khi tất cả subreducers trả về các phần copies, Root Reducer ghép chúng lại tạo thành 1 update State tree và gửi lại cho Store. Store thay thế State tree cũ bằng State tree mới.
  B7: Store nói với The view layer binding là có State mới.
  B8: The view layer binding báo Store gửi State mới cho mình
  B9: The view layer binding kích hoạt render view
  
  Update:
  connect() nhận vào 4 tham số mapStateToProps mapDispatchToProps mergeProps options:
   - mapStateToProps(state, [ownProps]) là function. Nếu được định nghĩa, container sẽ được đăng ký (subscribe) với store. Mỗi khi store update mapStateToProps sẽ được gọi, object mà nó trả về sẽ được merge với props của container. Nếu ownProps được định nghĩa, giá trị của nó sẽ là props được gửi cho container, đồng thời mỗi khi container nhận được new props thì mapStateToProps cũng sẽ được gọi. Nếu mapStateToProps không được định nghĩa container sẽ không được đăng ký và nhận update từ store.
   - mapDispatchToProps là object hoặc function. Nếu là object mỗi function bên trong object sẽ được coi là một action creator, đồng thời tất cả function này sẽ được tự động chay bởi bindActionCreators() và merge chúng với props của container. Nếu là function mapDispatchToProps sẽ nhận 2 tham số (dispatch, [ownProps]), chúng ta sẽ tự định nghĩa cách bind action với dispatch, chúng ta cũng có thể sử dụng bindActionCreators({action}, dispatch) để tự động bind. Nếu ownProps được định nghĩa, giá trị của nó sẽ là props được gửi cho container, đồng thời mỗi khi container nhận được new props thì mapDispatchToProps cũng sẽ được gọi. Nếu mapDispatchToProps không được định nghĩa sẽ chỉ có dispatch được merge vào props của container.
   - mergeProps(stateProps, dispatchProps, ownProps) là function. Nếu được định nghĩa, nó sẽ nhận vào tham số là kết qủa của mapStateToProps mapDispatchToProps và parent props. Object mà nó trả về là props được gửi cho container. Nếu không được định nghĩa Object.assign({}, ownProps, stateProps, dispatchProps) sẽ được sử dụng mặc định.
   - options là object. Nếu được định nghĩa sẽ điều chỉnh hành vi của connector. Chứa 2 giá trị pure và withRef. Nếu pure = true thì thực thi shouldComponentUpdate() và so sánh kết qủa của mergeProps để tránh những update không cần thiết, mặc định là true. Nếu withRef = true thì lưu trữ lại ref đến container instance và có thể truy cập thông qua getWrappedInstance(), mặc định false.
     