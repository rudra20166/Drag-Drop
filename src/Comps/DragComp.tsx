'use client'
import { DragEvent, useState,useRef,ChangeEvent} from "react";
import styled from "styled-components";
import { FaUpload } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";



export default function FileDrop() {
  const [images, setImages] = useState<File[]>([]);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0 ) {
      const selectedFiles = Array.from(event.target.files);
        

      const validFiles = selectedFiles.filter((file) =>
        file.name.match(/\.(svg|png|gif|jpg)$/));

      if (validFiles.length > 0) {
       
        if(validFiles.length<=3){
          setImages((prevImages) => [...prevImages, ...validFiles]);
          console.log('Selected Files:', validFiles);
        }
        else{
          alert("Max three files are allowed ")
        }
       
       
      } else {
        alert(
          'Invalid file type. Please select PNG, SVG, JPG, or GIF files.'
        );
      }
      
    } else {
     
      console.log('No file selected.');
    }
    
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const validFiles = droppedFiles.filter((file) =>
      file.name.match(/\.(svg|png|gif|jpg)$/)
    );

    if (validFiles.length > 0) {
      setImages((prevImages) => [...prevImages, ...validFiles]);
      console.log('Dropped Files:', validFiles);

      
    }
    else {
      alert(
        'Invalid file type. Please select PNG, SVG, JPG, or GIF files.'
      );
    }
    
  };

  const deleteHandler = (index: number) => {
    setImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
    });
  };
  return (
    
  )
}

const DeleteIcon=styled(RiDeleteBinFill)`
      position: absolute;
left: 2px;
bottom: 1.5px;      
width: 20px;
height: 20px;
color:red;

`
const ImageComp=styled.div`
  display: flex;
width: 144px;
height: 144px;
padding:  0px;
position: relative;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 0px;

background: #F3F4F6;
`
const ImageDiv=styled.div`
  display: flex;
padding:  0px;
align-items: flex-start;
gap:  16px;
align-self: stretch;
margin-bottom: 10px;
`


const Image=styled.img`
    width: 122px;
height: 125px;
flex-shrink: 0;
`

const Line=styled.span`
  
  color: var(--gray-500, #6B7280);

/* text-sm/font-normal */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 150%;
`
const FileInput=styled.input`
  display: none;
`

const BoldLine=styled.span`
    color: var(--gray-500, #6B7280);
text-align: center;

/* text-sm/font-semibold */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 150%; /* 21px */
`
const DragComp=styled.div`


`
const TextOne=styled.div`

`
const TextTwo=styled.div`
        color: var(--gray-500, #6B7280);
text-align: center;

/* text-xs/font-normal */
font-family: Inter;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: 150%; /* 18px */
`
const UploadIcon=styled(FaUpload)`
  width:  20px;
height:  20px;
color:gray;
border:none;
`
const UploadLabel=styled.label`
      display: flex;
padding:  0px;
flex-direction: column;
align-items: center;
gap:  8px;

`
const Drag=styled.div`
    display: flex;
width: 512px;
height: 228px;
flex-direction: column;
justify-content: center;
align-items: center;
border-radius: 8px;
border: 2px dashed  #E5E7EB;
background:  #F9FAFB;
`