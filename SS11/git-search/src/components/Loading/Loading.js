import './loading.style.css';

function Loading() {
  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;