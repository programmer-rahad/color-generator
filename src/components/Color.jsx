import { toast } from "react-toastify"; 

function Color({ hex, weight, index }) { 
  return (
    <article
      className={`color ${index > 10 ? "text-white" : ""}`}
      style={{ backgroundColor: `#${hex}` }}
      onClick={() => {  
        toast.success(`Color: #${hex} copied to clipboard!`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true, 
          theme: "light",
        });
        navigator.clipboard.writeText(`#${hex}`);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hex}</p> 
    </article>
  );
}

export default Color;
