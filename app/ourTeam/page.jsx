import React from "react";
import "./ourTeam.css";
import HeadNameCard from "../components/HeadNameCard";
import Card from "../components/Card";
import Header from "../components/header";

const ourTeam = () => {
  let datas = [
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "Shikari Shambu",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
    {
      imageSrc: "/img.jpg",
      name: "John Doe",
      position: "Software Engineer",
    },
  ];
  return (
    <div className="home-container">
      <Header></Header>

      {/* the top 3 */}
      <div className="top-3">
        <Card key={0} data={datas[0]} />
        <div className="top-3-main">
          <Card key={1} data={datas[0]} />
        </div>
        <Card key={2} data={datas[0]} />
      </div>

      {/* the 3x3 grid */}
      <div className="top-3x3grid">
        {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      {/* the rest */}
      <div className="top-rest">
        {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Circuits And Systems Society" />
      <div className="cards-grid">
        {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Communication Society" />
      <div className="cards-grid">
        {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Computer Society" />
      <div className="cards-grid">
        {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Control Systems Society" />
      <div className="cards-grid">
        {datas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default ourTeam;
