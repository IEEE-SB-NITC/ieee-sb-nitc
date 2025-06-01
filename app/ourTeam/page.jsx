import React from "react";
import "./ourTeam.css";
import HeadNameCard from "../components/HeadNameCard";
import Card from "../components/Card";
import Header from "../components/OurTeamHeader";

const ourTeam = () => {
  const top3Datas = [
    {
      imageSrc: "/images/DR Shihabudheen KV.png",
      name: "DR ShihabudheenKV",
      position: "Branch Counselor",
    },
    {
      imageSrc: "/images/Ajay Suresh.jpg",
      name: "Ajay Suresh",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/Gokhul G.jpg",
      name: "Gokhul G",
      position: "Secretary",
    },
  ];

  const top3GridDatas = [
    {
      imageSrc: "/images/Sreekanth Nair T S.jpg",
      name: "Sreekanth Nair T S",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/Abhishek A.jpg",
      name: "Abhishek A",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/Ann Mary Abraham.jpg",
      name: "Ann Mary Abraham",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/Nandan Nair.jpg",
      name: "Nandan Nair",
      position: "Treasurer",
    },
    {
      imageSrc: "/images/Vishnu T S.jpg",
      name: "Vishnu T S",
      position: "Chief MDC",
    },
    {
      imageSrc: "/images/Ansan Husain.jpg",
      name: "Ansan Husain",
      position: "Chief Link Representative",
    },
    {
      imageSrc: "/images/Ajay Mahesh.jpg",
      name: "Ajay Mahesh",
      position: "Sub Treasurer",
    },
    {
      imageSrc: "/images/R S Sanat Sreeram.jpg",
      name: "R S Sanat Sreeram",
      position: "MDC",
    },
    {
      imageSrc: "/images/Sheza Zain.jpg",
      name: "Sheza Zain",
      position: "Link Representative",
    },
  ];

  const topRestDatas = [
    {
      imageSrc: "/images/Paul Jimmy.jpg",
      name: "Paul Jimmy",
      position: "WebMaster",
    },
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Aditya Krishnan",
      position: "Technical Consultant",
    },
    {
      imageSrc: "/images/Paul Varghese Shibu.jpg",
      name: "Paul Varghese Shibu",
      position: "Technical Coordinator",
    },
    {
      imageSrc: "/images/Akhil T.jpg",
      name: "Akhil T",
      position: "Technical Coordinator",
    },
    {
      imageSrc: "/images/Bibin Thomas.png",
      name: "Bibin Thomas",
      position: "Project Head",
    },
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Adwaith P",
      position: "Project Head",
    },
    {
      imageSrc: "/images/Jishnu T Joseph.jpg",
      name: "Jishnu T Joseph",
      position: "Social Media Head",
    },
    {
      imageSrc: "/images/Adithya Shekhar.jpg",
      name: "Adithya Shekhar",
      position: "Design Head",
    },
  ];

  const CircuitsAndSystemsSocietyDatas = [
    {
      imageSrc: "/images/Gouri M Kandath.jpg",
      name: "Gouri M Kandath",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/Ashly Skariah.jpg",
      name: "Ashly Skariah",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/Vishnupriya S.jpg",
      name: "Vishnupriya S",
      position: "Secretary",
    },
    {
      imageSrc: "/images/Mohammed Adil K.jpg",
      name: "Mohammed Adil K",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Milan V Raj",
      position: "Technical Coordinator",
    },
  ];

  const CommunicationSocietyDatas = [
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Alok Sukumaran",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/Devesh K Bharathraj.jpg",
      name: "Devesh K Bharathraj",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/Piyush Anand.jpg",
      name: "Piyush Anand",
      position: "Secretary",
    },
    {
      imageSrc: "/images/Rahul R.jpg",
      name: "Rahul R",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/Akshay T Sriram.jpg",
      name: "Akshay T Sriram",
      position: "Technical Coordinator",
    },
  ];

  const ComputerSocietyDatas = [
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Anjay Krishna PJ",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/Sabin Binu.jpg",
      name: "Sabin Binu",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Uparapu Jayachandra",
      position: "Secretary",
    },
    {
      imageSrc: "/images/Mohammed Ryan M.jpg",
      name: "Mohammed Ryan M",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/Manu Paulson.jpg",
      name: "Manu Paulson",
      position: "Technical Coordinator",
    },
    {
      imageSrc: "/images/Manisha John Varghese.jpg",
      name: "Manisha John Varghese",
      position: "WIC",
    },
  ];

  const ControlSystemsSocietyDatas = [
    {
      imageSrc: "/images/insert image here.gif", //--------insert image---------------------------------------------
      name: "Anjay Krishna PJ",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/Sabin Binu.jpg",
      name: "Sabin Binu",
      position: "Vise Chair",
    },
  ];

  return (
    <div className="home-container">
      <Header></Header>

      {/* the top 3 */}
      <div className="top-3">
        <Card key={0} data={top3Datas[1]} />
        <div className="top-3-main">
          <Card key={1} data={top3Datas[0]} />
        </div>
        <Card key={2} data={top3Datas[2]} />
      </div>

      {/* the 3x3 grid */}
      <div className="cards-grid">
        {top3GridDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      {/* the rest */}
      <div className="top-rest">
        {topRestDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Circuits And Systems Society" />
      <div className="cards-grid">
        {CircuitsAndSystemsSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Communication Society" />
      <div className="cards-grid">
        {CommunicationSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Computer Society" />
      <div className="cards-grid">
        {ComputerSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Control Systems Society" />
      <div className="cards-grid">
        {ControlSystemsSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default ourTeam;
