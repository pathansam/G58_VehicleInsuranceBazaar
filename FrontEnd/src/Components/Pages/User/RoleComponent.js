import styled from 'styled-components';



export const Container = styled.div`
background-color: #fff;
border-radius: 30px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
max-width: 100%;
height: 90vh;
margin-bottom: 100px;
margin-top: 20px;
margin-left: 20px;
margin-right: 20px;
`;

export const div = styled.div`
background-color: #fff;
border-radius: 30px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
max-width: 50%;
margin:5% 35%;
height: 50vh;
margin-bottom: 100px;

`;
export const div1 = styled.div`
background-color: #fff;
border-radius: 30px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
max-width: 50%;
margin:5% 35%;
height: 50vh;
margin-bottom: 100px;

`;

export const Form = styled.form`
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 40vh;
text-align: center;
`;

export const Title = styled.h1`
font-weight: bold;
margin: 0;
`;

export const Input = styled.input`
background-color: #eee;
border: none;
padding: 8px 12px;
margin: 8px 0;
width: 100%;
font-size:20px;
`;


export const Button = styled.button`
   border-radius: 20px;
   border: 1px solid #ff4b2b;
   background-color: #ff4b2b;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   margin-left:30px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const Button1 = styled.button`
   border-radius: 20px;
   border: 1px solid #ff4b2b;
   background-color: #ff4b2b;
   color: #ffffff;
   font-size: 20px;
   font-weight: bold;
   padding: 12px 35px;
   margin-top:30px;
   letter-spacing: 1px;
   margin-left:30px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const Add = styled.button`
   border-radius: 20px;
   border: 1px solid #ff4b2b;
   background-color: #ff4b2b;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const Cancel = styled.button`
   border-radius: 20px;
   border: 1px solid #ff4b2b;
   background-color: Green;
   color: #ffffff;
   font-size: 12px;
   font-weight: bold;
   padding: 12px 45px;
   letter-spacing: 1px;
   text-transform: uppercase;
   transition: transform 80ms ease-in;
   &:active{
       transform: scale(0.95);
   }
   &:focus {
       outline: none;
   }
`;
export const GhostButton = styled(Button)`
background-color: transparent;
border-color: #ffffff;
`;

export const Anchor = styled.a`
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
`;
export const OverlayContainer = styled.div`
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
${props =>
 props.signinIn !== true ? `transform: translateX(-100%);` : null}
`;

export const Overlay = styled.div`
background: #ff416c;
background: -webkit-linear-gradient(to right, #FFFFFF, #0000FF);
background: linear-gradient(to right, #0000FF, #acacac);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => props.signinIn !== true ? `transform: translateX(0);` : null}
`;

export const RightOverlayPanel = styled(OverlayPanel)`
    right: 0;
    transform: translateX(0);
    ${props => props.signinIn !== true ? `transform: translateX(20%);` : null}
`;

export const Paragraph = styled.p`
font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px
`;