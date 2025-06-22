import React from "react";
import HeadNameCard from "../components/HeadNameCard";
import Card from "../components/Card";
import Header from "../components/OurTeamHeader";
import styles from "./ourTeam.module.css";

const ourTeam = () => {
  const top3Datas = [
    {
      imageSrc: "/images/dr_shihabudheen_kv.png",
      name: "DR ShihabudheenKV",
      position: "Branch Counselor",
    },
    {
      imageSrc: "/images/ajay_suresh_sj.jpg",
      name: "Ajay Suresh SJ",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/gokhul_g.jpg",
      name: "Gokhul G",
      position: "Secretary",
    },
  ];

  const top3GridDatas = [
    {
      imageSrc: "/images/sreekanth_nair_ts.jpg",
      name: "Sreekanth Nair TS",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/abhishek_a.jpg",
      name: "Abhishek A",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/ann_mary_abraham.jpg",
      name: "Ann Mary Abraham",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/nandan_nair.jpg",
      name: "Nandan Nair",
      position: "Treasurer",
    },
    {
      imageSrc: "/images/vishnu_t_s.jpg",
      name: "Vishnu T S",
      position: "Chief MDC",
    },
    {
      imageSrc: "/images/ansan_husain.jpg",
      name: "Ansan Husain",
      position: "Chief Link Representative",
    },
    {
      imageSrc: "/images/ajay_mahesh.jpg",
      name: "Ajay Mahesh",
      position: "Sub Treasurer",
    },
    {
      imageSrc: "/images/r_s_sanat_sreeram.jpg",
      name: "R S Sanat Sreeram",
      position: "MDC",
    },
    {
      imageSrc: "/images/sheza_zain.jpg",
      name: "Sheza Zain",
      position: "Link Representative",
    },
  ];

  const topRestDatas = [
    {
      imageSrc: "/images/paul_jimmy.jpg",
      name: "Paul Jimmy",
      position: "WebMaster",
    },
    {
      imageSrc: "/images/aditya_krishnan.jpg",
      name: "Aditya Krishnan",
      position: "Technical Consultant",
    },
    {
      imageSrc: "/images/paul_varghese_shibu.jpg",
      name: "Paul Varghese Shibu",
      position: "Technical Coordinator",
    },
    {
      imageSrc: "/images/akhil_t.jpg",
      name: "Akhil T",
      position: "Technical Coordinator",
    },
    {
      imageSrc: "/images/bibin_tj.png",
      name: "Bibin TJ",
      position: "Project Head",
    },
    {
      imageSrc: "/images/adwaith_p.jpg",
      name: "Adwaith P",
      position: "Project Head",
    },
    {
      imageSrc: "/images/jishnu_t_joseph.jpg",
      name: "Jishnu T Joseph",
      position: "Social Media Head",
    },
    {
      imageSrc: "/images/adithya_shekhar.jpg",
      name: "Adithya Shekhar",
      position: "Design Head",
    },
  ];

  const CircuitsAndSystemsSocietyDatas = [
    {
      imageSrc: "/images/gouri_m_kandath.jpg",
      name: "Gouri M Kandath",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/ashly_skariah.jpg",
      name: "Ashly Skariah",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/vishnupriya_s.jpg",
      name: "Vishnupriya S",
      position: "Secretary",
    },
    {
      imageSrc: "/images/mohammed_adil_k.jpg",
      name: "Mohammed Adil K",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/milan_v_raj.jpg",
      name: "Milan V Raj",
      position: "Technical Coordinator",
    },
  ];

  const CommunicationSocietyDatas = [
    {
      imageSrc: "/images/alok_sukumaran.jpg",
      name: "Alok Sukumaran",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/devesh_k_bharathraj.jpg",
      name: "Devesh K Bharathraj",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/piyush_anand.jpg",
      name: "Piyush Anand",
      position: "Secretary",
    },
    {
      imageSrc: "/images/rahul_r.jpg",
      name: "Rahul R",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/akshay_t_sriram.jpg",
      name: "Akshay T Sriram",
      position: "Technical Coordinator",
    },
  ];

  const ComputerSocietyDatas = [
    {
      imageSrc: "/images/anjay_krishna_pj.jpg",
      name: "Anjay Krishna PJ",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/sabin_binu.jpg",
      name: "Sabin Binu",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/uparapu_jayachandra.jpg",
      name: "Uparapu Jayachandra",
      position: "Secretary",
    },
    {
      imageSrc: "/images/mohammed_ryan_m.jpg",
      name: "Mohammed Ryan M",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/manu_paulson.jpg",
      name: "Manu Paulson",
      position: "Technical Coordinator",
    },
    {
      imageSrc: "/images/manisha_john_varghese.jpg",
      name: "Manisha John Varghese",
      position: "WIC",
    },
  ];

  const ControlSystemsSocietyDatas = [
    {
      imageSrc: "/images/dona_binu.jpg",
      name: "Dona Binu",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/riyan_varghese.jpg",
      name: "Riyan Varghese",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/alok_krishna.jpg",
      name: "Alok Krishna",
      position: "Secretary",
    },
    {
      imageSrc: "/images/rithwik_d.jpg",
      name: "Rithwik D",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/thrinath_s_ashok.jpg",
      name: "Thrinath S Ashok",
      position: "Technical Coordinator",
    },
  ];

  const ElectronDeviceSociety = [
    {
      imageSrc: "/images/adithyadev_s_s.jpg",
      name: "Adithyadev S S",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/aadithya_suja.jpg",
      name: "Aadithya Suja",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/hridya_sudhakaran.jpg",
      name: "Hridya Sudhakaran",
      position: "Secretary",
    },
    {
      imageSrc: "/images/anand_s_b.jpg",
      name: "Anand S B",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/diya_susan_kuruvilla.jpg",
      name: "Diya Susan Kuruvilla",
      position: "Technical Coordinator",
    },
  ];

  const EducationSociety = [
    {
      imageSrc: "/images/samin_murali.jpg",
      name: "Samin Murali",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/njanaprakasam_k_s.jpg",
      name: "Njanaprakasam K S",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/pournami_j_prakash.jpg",
      name: "Pournami J Prakash",
      position: "Secretary",
    },
    {
      imageSrc: "/images/irene_elsa_binu.jpg",
      name: "Irene Elsa Binu",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/aadarsh_p_b.jpg",
      name: "Aadarsh P B",
      position: "Technical Coordinator",
    },
  ];

  const IndustryApplicationsSociety = [
    {
      imageSrc: "/images/shreya_r_nair.jpeg",
      name: "Shreya R Nair",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/sai_narayanan_u_s.jpg",
      name: "Sai Narayanan U S",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/sreeya_balu.jpg",
      name: "Sreeya Balu",
      position: "Secretary",
    },
    {
      imageSrc: "/images/jasna_jaison.jpg",
      name: "Jasna Jaison",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/madhusoodhanan_s.jpg",
      name: "Madhusoodhanan S",
      position: "Technical Coordinator",
    },
  ];

  const RoboticsAndAutomationSociety = [
    {
      imageSrc: "/images/bharadwaj_v_p.jpg",
      name: "Bharadwaj V P",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/leo_joseph.jpg",
      name: "Leo Joseph",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/anandhakrishnan.jpg",
      name: "Anandhakrishnan",
      position: "Secretary",
    },
    {
      imageSrc: "/images/rinoofa_sherin.jpg",
      name: "Rinoofa Sherin",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/avinash_s.jpg",
      name: "Avinash S",
      position: "Technical Coordinator",
    },
  ];

  const SpecialInterestGroupOnHumanitarianTechnology = [
    {
      imageSrc: "/images/varsha_suresh.png",
      name: "Varsha Suresh",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/abdullah_amir_p.jpeg",
      name: "Abdullah Amir P",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/karthik_shankar_s.png",
      name: "Karthik Shankar S",
      position: "Secretary",
    },
    {
      imageSrc: "/images/jibin_biju.jpg",
      name: "Jibin Biju",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/abhishek_mohan.jpg",
      name: "Abhishek Mohan",
      position: "SIGHT Treasurer",
    },
    {
      imageSrc: "/images/jovan_jacob.jpg",
      name: "Jovan Jacob",
      position: "Project Head",
    },
    {
      imageSrc: "/images/vinay_m_p.jpg",
      name: "Vinay M P",
      position: "Associate Project Coordinator",
    },
  ];

  const SignalProcessingSociety = [
    {
      imageSrc: "/images/deepak_santhosh.jpg",
      name: "Deepak Santhosh",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/jumana_faby_khan.jpg",
      name: "Jumana Faby Khan",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/muhammed_shahil_k.jpg",
      name: "Muhammed Shahil K",
      position: "Secretary",
    },
    {
      imageSrc: "/images/ajay_krishna_k.jpg",
      name: "Ajay Krishna K",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/sanjay_r_senan.jpg",
      name: "Sanjay R Senan",
      position: "Technical Coordinator",
    },
  ];

  const WomenInEngineering = [
    {
      imageSrc: "/images/gayathri_k.jpg",
      name: "Gayathri K",
      position: "Chairperson",
    },
    {
      imageSrc: "/images/nidhi_mythily_girish.jpg",
      name: "Nidhi Mythily Girish",
      position: "Vice Chair",
    },
    {
      imageSrc: "/images/aiswarya_k_narayan.jpg",
      name: "Aiswarya K Narayan",
      position: "Secretary",
    },
    {
      imageSrc: "/images/keerthana_p_t.jpg",
      name: "Keerthana P T",
      position: "Joint Secretary",
    },
    {
      imageSrc: "/images/shwetha_nair_b_s.jpg",
      name: "Shwetha Nair B S",
      position: "Technical Coordinator",
    },
  ];

  return (
    <div className={styles.homecontainer}>
      <Header></Header>

      {/* the top 3 */}
      <div className={styles.top3}>
        <Card key={0} data={top3Datas[1]} />
        <div className={styles.top3main}>
          <Card key={1} data={top3Datas[0]} />
        </div>
        <Card key={2} data={top3Datas[2]} />
      </div>

      {/* the 3x3 grid */}
      <div className={styles.cardsgrid}>
        {top3GridDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      {/* the rest */}
      <div className={styles.toprest}>
        {topRestDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Circuits And Systems Society" />
      <div className={styles.cardsgrid}>
        {CircuitsAndSystemsSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Communication Society" />
      <div className={styles.cardsgrid}>
        {CommunicationSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Computer Society" />
      <div className={styles.cardsgrid}>
        {ComputerSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Control Systems Society" />
      <div className={styles.cardsgrid}>
        {ControlSystemsSocietyDatas.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Electron Device Society  (EDS)" />
      <div className={styles.cardsgrid}>
        {ElectronDeviceSociety.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Education Society (EdSoc)" />
      <div className={styles.cardsgrid}>
        {EducationSociety.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Industry Application Society  (IAS)" />
      <div className={styles.cardsgrid}>
        {IndustryApplicationsSociety.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Robotics and Automation Society  (RAS)" />
      <div className={styles.cardsgrid}>
        {RoboticsAndAutomationSociety.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Special Interest Group on Humanitarian Technology (SIGHT)" />
      <div className={styles.cardsgrid}>
        {SpecialInterestGroupOnHumanitarianTechnology.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Signal Processing Society (SPS)" />
      <div className={styles.cardsgrid}>
        {SignalProcessingSociety.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>

      <HeadNameCard text="Signal Processing Society (SPS)" />
      <div className={styles.cardsgrid}>
        {WomenInEngineering.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </div>
    </div>
  );
};

export default ourTeam;
