"use client";
import Image from "next/image";
import BlankImg from '../../public/next.svg'
import { Inter } from "next/font/google";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Select,
  Textarea,
  Datepicker,
} from "flowbite-react";
import styled from "styled-components";
import { RxCross2 } from "react-icons/rx";
import { FaInfoCircle } from "react-icons/fa";
import { BsPaperclip } from "react-icons/bs";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaFileImage } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaFaceLaugh } from "react-icons/fa6";
import { FaListUl } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { RiDeleteBinFill } from "react-icons/ri";
import { DragEvent, useState, ChangeEvent, useRef } from "react";
import { FaUpload } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodError } from "zod";
import { File } from "buffer";
import { watch } from "fs";
import { type } from "os";

export default function Component() {


  

  type Inputs = {
    Name: string;
    Brand: string;
    Language:string;
    Price:number;
    BWeight:number;
    Length:number;
    Breadth:number;
    Width:number;
    Description:string;
    Date:string;
    Images:any;
  };


  

  const schema = z.object({
    Name: z
      .string()
      .min(3, "Name should be atleast three characters")
      .max(10, "Name should contain most 10 characters"),
    Brand: z
      .string()
      .min(3, "Brand should be atleast three characters")
      .max(10, "Brand should contain most 10 characters"),
    Language: z.string(),
    Images:z.any().refine((files) => files?.length ==0, { message: 'Mininmum one Image is required.' }),
    
    BWeight: z
      .string()
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) !== 0,
        {
          message: "Invalid item weight. Please enter a valid non-zero number.",
        }
      ),
    Price: z
      .string()
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) !== 0,
        { message: "Invalid item Price. Please enter a valid non-zero number." }
      ),
    Length: z
      .string()
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) !== 0,
        { message: "Invalid Value. Please enter a valid non-zero number." }
      ),
    Breadth: z
      .string()
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) !== 0,
        { message: "Invalid Value. Please enter a valid non-zero number." }
      ),
    Width: z
      .string()
      .refine(
        (value) => /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) !== 0,
        { message: "Invalid Value. Please enter a valid non-zero number." }
      ),
    Description: z
      .string()
      .min(30, "Description should be atleast 30 characters")
      .max(100, "Description should contain most 100 characters"),
    Date:z.string().refine((date)=>new Date(date).toString() !=="Invalid Date",{
        message:"A valid date is required.",
      }).transform((date)=>new Date(date)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [images, setImages] = useState<File[]>([]);

  const handleImage = (event: ChangeEvent<HTMLInputElement>) => {
 

      if (event.target.files && event.target.files.length > 0) {
        const selectedFiles = Array.from(event.target.files);
  
        const validFiles = selectedFiles.filter((file) =>
          file.name.match(/\.(svg|png|gif|jpg)$/)
        );

        if (validFiles.length > 0) {
          if (validFiles.length <= 3 && images.length<3) {
            setImages((prevImages) => [...prevImages, ...validFiles]);
            console.log("Selected Files:", validFiles);
          } else {
            alert("Max three files are allowed ");
          }
        } else {
          alert("Invalid file type. Please select PNG, SVG, JPG, or GIF files.");
        }
      } else {
        console.log("No file selected.");
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
      console.log(validFiles)
    } else {
      alert("Invalid file type. Please select PNG, SVG, JPG, or GIF files.");
    }

    
  };

  const deleteHandler = (index: number) => {
    setImages((prevImages) => {
      return prevImages.filter((_, i) => i !== index);
    });
  };

  return (
    <Comp onSubmit={handleSubmit(onSubmit)}>
      <Head>
        <Heading>NEW PRODUCT</Heading>
        <RxCross />
      </Head>
      <MidComp>
        <Left>
          <ProductName>
            <LabelComp htmlFor="email1" value="Product Name" />
            <ProductInput
              type="text"
              placeholder="Apple iMac 27” "
              {...register("Name")}
            />
            {errors.Name && (
              <div style={{ color: "#ed1515" }}>{errors.Name.message}</div>
            )}
          </ProductName>
          <Description>
            <LabelComp htmlFor="" value="Description" />
            <TextSection>
              <LogoSec>
                <StyledIcon>
                  <BsPaperclip />
                </StyledIcon>
                <StyledIcon>
                  <RiMapPin2Fill />
                </StyledIcon>
                <StyledIcon>
                  <FaFileImage />
                </StyledIcon>
                <StyledIcon>
                  <FaCode />
                </StyledIcon>
                <StyledIcon>
                  <FaFaceLaugh />
                </StyledIcon>
                <StraightLine />
                <StyledIcon>
                  <FaListUl />
                </StyledIcon>
                <StyledIcon>
                  <IoIosSettings />
                </StyledIcon>
                <StyledIcon>
                  <FaCalendarAlt />
                </StyledIcon>
                <StyledIcon>
                  <FaDownload />
                </StyledIcon>
              </LogoSec>
              <Text>
                <Textarea
                  id="comment"
                  {...register("Description")}
                  rows={9}
                  placeholder="Standard glass
3.8GHz 8-core 10th-generation Intel Core i7 processor, Turbo Boost up to 5.0GHz
16GB 2666MHz DDR4 memory
Radeon Pro 5500 XT with 8GB of GDDR6 memory
256GB SSD storage
Gigabit Ethernet
Magic Mouse 2
Magic Keyboard - US"
                />
              </Text>
            </TextSection>
            {errors.Description && (
              <div style={{ color: "#ed1515" }}>
                {errors.Description.message}
              </div>
            )}
          </Description>
            <ImageDrop>
          <LabelComp htmlFor="email1" value="Product Images" />
          <DragComp >
       <ImageDiv>
       {images.map((image, index) => (
          <ImageComp key={index}>
            <ProductImage
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Uploaded File ${index}`}
            
          />
          <DeleteIcon 
          onClick={()=>deleteHandler(index)}
          />
          </ImageComp>
        ))}
       </ImageDiv>
       
        <Drag  onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        
          <UploadLabel onChange={handleImage} >
            <UploadIcon/>
            <TextOne>
              <BoldLine>Click to upload </BoldLine>
              <Line>or drag and drop</Line>
            </TextOne>
            <TextTwo>SVG, PNG, JPG or GIF (MAX. 800x400px)</TextTwo>
              <FileInput  type="file" alt="" id="ImageFile"  multiple accept="image/*" {...register("Images")}/>
              
          </UploadLabel>
         
        </Drag>
    </DragComp>
    {errors.Images && (
              <div style={{ color: "#ed1515" }}>{errors.Images.message}</div>
            )}
          </ImageDrop>  
          <Check>
            <Checkbox id="remember" />
            <LabelComp htmlFor="remember">
              Product has multiple options, like different colors or sizes
            </LabelComp>
          </Check>
          <LabelComp htmlFor="email1" value="Project Title" />
          <DateComp  {...register("Date")}/>  
          <ButtonComp>
            <UpdateButton>Update</UpdateButton>
            <DeleteButton>
              <RiDeleteBinFill />
              Delete
            </DeleteButton>
          </ButtonComp>
        </Left>
        <Right>
          <Brand>
            <LabelComp htmlFor="Brand" value="Brand" />
            <RightInput
              type="text"
              placeholder="Apple "
              {...register("Brand")}
            />
            {errors.Brand && (
              <div style={{ color: "#ed1515" }}>{errors.Brand.message}</div>
            )}
          </Brand>
          <Language>
            <LanguageHead>
              <LanguageLabel htmlFor="email1" value="Select language" />
              <Info />
            </LanguageHead>
            <LangSelect id="countries" {...register("Language")}>
              <option>English</option>
              <option>French</option>
              <option>German</option>
              <option>Russian</option>
            </LangSelect>
          </Language>
          <Price>
            <LabelComp htmlFor="Price" value="Price" />
            <RightInput
              id="Price"
              type="text"
              placeholder="$2999"
              {...register("Price")}
            />
            {errors.Price && (
              <div style={{ color: "#ed1515" }}>{errors.Price.message}</div>
            )}
          </Price>
          <ItemWeight>
            <LabelComp htmlFor="Weight" value="Item Weight (kg)" />
            <RightInput type="text" placeholder="12" {...register("BWeight")} />
            {errors.BWeight && (
              <div style={{ color: "#ed1515" }}>{errors.BWeight.message}</div>
            )}
          </ItemWeight>
          <Length>
            <LabelComp htmlFor="Length" value="Lenght(cm)" />
            <RightInput
              type="text"
              placeholder="105"
              
              {...register("Length")}
            />
            {errors.Length && (
              <div style={{ color: "#ed1515" }}>{errors.Length.message}</div>
            )}
          </Length>
          <Breadth>
            <LabelComp htmlFor="Breadth" value="Breadth(cm)" />
            <RightInput
              type="text"
              placeholder="15"
              
              {...register("Breadth")}
            />
            {errors.Breadth && (
              <div style={{ color: "#ed1515" }}>{errors.Breadth.message}</div>
            )}
          </Breadth>
          <Width>
            <LabelComp htmlFor="Width" value="Widht(cm)" />
            <RightInput
              type="text"
              placeholder="23"
              
              {...register("Width")}
            />
            {errors.Width && (
              <div style={{ color: "#ed1515" }}>{errors.Width.message}</div>
            )}
          </Width>
        </Right>
      </MidComp>
    </Comp>
  );
}

const DeleteIcon = styled(RiDeleteBinFill)`
  position: absolute;
  left: 2px;
  bottom: 1.5px;
  width: 20px;
  height: 20px;
  color: red;
`;
const ImageComp = styled.div`
  display: flex;
  width: 144px;
  height: 144px;
  padding: 0px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;

  background: #f3f4f6;
`;
const ImageDiv = styled.div`
  display: flex;
  padding: 0px;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  margin-bottom: 10px;
`;

const ProductImage = styled.img`
  width: 122px;
  height: 125px;
  flex-shrink: 0;
`;

const Line = styled.span`
  color: var(--gray-500, #6b7280);

  /* text-sm/font-normal */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
const FileInput = styled.input`
  display: none;
`;

const BoldLine = styled.span`
  color: var(--gray-500, #6b7280);
  text-align: center;

  /* text-sm/font-semibold */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
`;
const DragComp = styled.div``;
const TextOne = styled.div``;
const TextTwo = styled.div`
  color: var(--gray-500, #6b7280);
  text-align: center;

  /* text-xs/font-normal */
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;
const UploadIcon = styled(FaUpload)`
  width: 20px;
  height: 20px;
  color: gray;
  border: none;
`;
const UploadLabel = styled.label`
  display: flex;
  padding: 0px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
const Drag = styled.div`
  display: flex;
  width: 512px;
  height: 228px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px dashed #e5e7eb;
  background: #f9fafb;
`;

const UpdateButton = styled.button`
  color: white;
  background: #1a56db;

  font-weight: 600;
  padding: 10px 20px;

  border-radius: 8px;
`;

const ButtonComp = styled.div`
  display: flex;
  padding: 0px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;
const DeleteButton = styled.div`
  display: flex;
  font-weight: 600;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: red;
  color: white;
  border-radius: 8px;
  cursor: pointer;
`;
const Check = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  gap: 8px;
`;
const DateComp = styled(Datepicker)`
  width: 100%;
`;
const Text = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;
const StraightLine = styled.div`
  background: #d1d5db;
  width: 1px;
  height: 16px;
`;
const StyledIcon = styled.div`
  width: 16px;
  height: 16px;
  color: #6b7280;
`;
const LogoSec = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const TextSection = styled.div`
  display: flex;
  padding: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
  height: 250px;
  border-radius: 8px;
  border: 1px solid #f1d2d4;
  background-color: #f9fafb;
  align-self: stretch;
  border-radius: 8px;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const ImageDrop = styled.div``;
const Width = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const LabelComp = styled(Label)`
  color: #111928;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const RightInput = styled(TextInput)`
  
`;

const Breadth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Length = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const ItemWeight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const LangSelect = styled(Select)`
  width: 95%;
`;
const Info = styled(FaInfoCircle)`
  color: gray;
  width: 12px;
  height: 12px;
`;
const LanguageLabel = styled(Label)`
  color: #111928;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
const LanguageHead = styled.div`
  display: flex;
  padding: 0px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;
const Language = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const ProductInput = styled(TextInput)`
  display: flex;

  align-items: center;
  gap: 10px;
  align-self: stretch;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
  
`;

const ProductName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const Left = styled.div`
  display: flex;
  width: 512px;
  padding: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
const Right = styled.div`
  display: flex;
  padding: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
`;
const Heading = styled.h1`
  color: #9ca3af;

  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-transform: uppercase;
`;

const MidComp = styled.div`
  display: flex;

  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  align-self: stretch;
`;
const RxCross = styled(RxCross2)`
  width: 20px;
  height: 20px;
  color: #6b7280;
`;

const Comp = styled.form`
  display: flex;
  width: 768px;
  height: 1152px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex-shrink: 0;
  border: 2px solid #e5e7eb;
  background-color: white;
`;
const Head = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
