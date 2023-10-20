import { useState, useEffect } from "react";
import Color from "./Color";
import Loading from "./Loading"; 
import Values from "values.js";
import{ ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Colors.scss";
  
function Colors() {
  const [loading, setLoading] = useState(true);  
  const [color, setColor] = useState("#ffcd00");
  const [colors, setColors] = useState([]); 

  const handleChange = e => { 
    let color = e.target.value; 
    if(e.type === 'blur') {
      color = color[0] === '#' ? color : '#' + color; 
      color = color.length === 4 ? `#${color[1] + color[1]}${color[2] + color[2]}${color[3] + color[3]}` : color;    
    } 
    setColor(color);    
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    changeColor();
  };

  const changeColor = () => {
    try {
      setLoading(false);
      const colors = new Values(color).all(10);
      setColors(colors);
    } catch (e) {  
      toast.error(`${e.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true, 
        theme: "light",
      });
    }
  };

  useEffect(() => {
    changeColor();
  }, []);

 
  if (loading) return <Loading />; 

  return (
    <main> 
      <ToastContainer />
      <section className="container">
        <h4>color generator</h4>
        <form className="color-form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="color"
           value={color}
          />
          <input
            type="text"
            placeholder={color}
            value={color}
            onChange={handleChange}
            onBlur={handleChange} 
          />
          <button
            className="btn"
            type="submit"
            style={{ background: "rgb(202, 104, 104)" }}
          >
            submit
          </button>
        </form>
         
      </section> 
      <section className="colors">
        {colors.map((color, index) => { 
          const props = {
            ...color,
            index,
            hex: color.hex,  
          }
          return <Color key={index} {...props} />;
        })}
      </section> 
    </main>
  );
}

export default Colors;
