import React from "react";
import styles from "./ourTeam.module.css";
import HeadNameCard from "../../../components/meetOurTeam/HeadNameCard";
import Card from "../../../components/meetOurTeam/Card";
import Header from "../../../components/meetOurTeam/OurTeamHeader";

const ourTeam = () => {
    const top3Datas = [
        {
            imageSrc: "/images/dr_shihabudheen_kv.png",
            name: "DR ShihabudheenKV",
            position: "Branch Counselor",
        },
        {
            imageSrc: "/images/leo_joseph.jpg",
            name: "Leo Joseph",
            position: "Chairperson",
        },
        {
            imageSrc: "/images/ann_mary_abraham.jpg",
            name: "Ann Mary Abraham",
            position: "Secretary",
        },
    ];

    const top3GridDatas = [
        {
            imageSrc: "/images/sankeerth_j_i.jpg",
            name: "Sankeerth J I",
            position: "Vice Chair",
        },
        {
            imageSrc: "/images/kurian_mathew_c.jpg",
            name: "Kurian Mathew C",
            position: "Joint Secretary",
        },
        {
            imageSrc: "/images/nikita_james.png",
            name: "Nikita James",
            position: "Joint Secretary",
        },
        {
            imageSrc: "/images/sabin_binu.jpg",
            name: "Sabin Binu",
            position: "Treasurer",
        },
        {
            imageSrc: "/images/r_s_sanat_sreeram.jpg",
            name: "R S Sanat Sreeram",
            position: "Chief MDC",
        },
        {
            imageSrc: "/images/sheza_zain.jpeg",
            name: "Sheza Zain",
            position: "Chief Link Representative",
        },
        {
            imageSrc: "/images/adhil_biju.jpg",
            name: "Adhil Biju",
            position: "Sub Treasurer",
        },
        {
            imageSrc: "/images/adithyan_v.jpg",
            name: "Adithyan V",
            position: "MDC",
        },
        {
            imageSrc: "/images/ameekh_ajmal.jpg",
            name: "Ameekh Ajmal",
            position: "MDC",
        },
        {
            imageSrc: "/images/amina_zeba.jpg",
            name: "Amina Zeba",
            position: "Link Representative",
        },
    ];

    const topRestDatas = [
        {
            imageSrc: "/images/paul_shibu_varghese.jpg",
            name: "Paul Shibu Varghese",
            position: "WebMaster",
        },
        {
            imageSrc: "/images/akhil_t.jpg",
            name: "Akhil T",
            position: "Technical Consultant",
        },
        {
            imageSrc: "/images/jefin_joji.jpg",
            name: "Jefin Joji",
            position: "Technical Coordinator",
        },
        {
            imageSrc: "/images/ananthu_sankar.jpg",
            name: "Ananthu Sankar",
            position: "Technical Coordinator",
        },
        {
            imageSrc: "/images/njanaprakasam.jpg",
            name: "Njanaprakasam",
            position: "Project Head",
        },
        {
            imageSrc: "/images/devesh_k_bharathraj.jpg",
            name: "Devesh K Bharathraj",
            position: "Project Head",
        },
        {
            imageSrc: "/images/avinash_s.jpg",
            name: "Avinash S",
            position: "Social Media Head",
        },
        {
            imageSrc: "/images/rahul_r.jpg",
            name: "Rahul R",
            position: "Design Head",
        },
        {
            imageSrc: "/images/shezin_muhammed.jpeg",
            name: "Shezin Muhammed",
            position: "Design",
        },
        {
            imageSrc: "/images/prajhna_n.jpg",
            name: "Prajhna N",
            position: "Design",
        },
        {
            imageSrc: "/images/sreeya_balu.jpg",
            name: "Sreeya Balu",
            position: "SIGHT PROJECT HEAD",
        },
        {
            imageSrc: "/images/sai_narayan.jpg",
            name: "Sai Narayan",
            position: "SIGHT PROJECT HEAD",
        },
    ];

    const RoboticsAndAutomationSociety = [
        {
            imageSrc: "/images/anandhakrishnan_p_s.jpg",
            name: "Anandhakrishnan P S",
            position: "Chairperson",
        },
        {
            imageSrc: "/images/adithyan_a_s.jpg",
            name: "Adithyan A S",
            position: "Member",
        },
        {
            imageSrc: "/images/farhana.jpg",
            name: "Farhana",
            position: "Member",
        },
        {
            imageSrc: "/images/vivek_v_pillai.jpg",
            name: "Vivek V Pillai",
            position: "Member",
        },
        {
            imageSrc: "/images/gauryshanker.jpg",
            name: "Gauryshanker",
            position: "Member",
        },
    ];

    const IndustryApplicationsSociety = [
        {
            imageSrc: "/images/anand_s_b.jpg",
            name: "Anand S B",
            position: "Chairperson",
        },
        {
            imageSrc: "/images/rashid_rahman.jpg",
            name: "Rashid Rahman",
            position: "Member",
        },
        {
            imageSrc: "/images/adil_sha_h_s.jpg",
            name: "Adil Sha H S",
            position: "Member",
        },
        {
            imageSrc: "/images/gautham_shanker.png",
            name: "Gautham Shanker",
            position: "Member",
        },
        {
            imageSrc: "/images/abhijith_lal.jpg",
            name: "Abhijith Lal",
            position: "Member",
        },
    ];
    
    const WomenInEngineering = [
        {
            imageSrc: "/images/aiswarya_k_narayan.jpg",
            name: "Aiswarya K Narayan",
            position: "Chairperson",
        },
        {
            imageSrc: "/images/fathima_nasla.jpg",
            name: "Fathima Nasla",
            position: "Member",
        },
        {
            imageSrc: "/images/ahla_m_i.jpeg",
            name: "Ahla M I",
            position: "Member",
        },
        {
            imageSrc: "/images/rosmi_ann.jpg",
            name: "Rosmi Ann",
            position: "Member",
        },
        {
            imageSrc: "/images/anannya_nevin.jpg",
            name: "Anannya Nevin",
            position: "Member",
        },
    ];

    const ElectronDeviceSociety = [
        { 
            imageSrc: "/images/aadithya_suja.jpg", 
            name: "Aadithya Suja", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/john_joseph.jpg", 
            name: "John Joseph", 
            position: "Member"
         },
        {
            imageSrc: "/images/adarsh_s.jpeg", 
            name: "Adarsh S", 
            position: "Member" 
        },
        {
            imageSrc: "/images/joe_j_thannickamattam.jpeg",
            name: "Joe J Thannickamattam",
            position: "Member" 
        },
        {
            imageSrc: "/images/alena_jaison.jpg", 
            name: "Alena Jaison", 
            position: "Member"
        },
    ];
    
    const EducationSociety = [
        { 
            imageSrc: "/images/aadarsh_p_b.jpg", 
            name: "Aadarsh P B", 
            position: "Chairperson" 
        },
        {
            imageSrc: "/images/gowribala_a_nair.jpg", 
            name: "Gowribala A Nair", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/sreelekshmi_p.jpg", 
            name: "Sreelekshmi P", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/pavan_priyesh.jpg", 
            name: "Pavan priyesh", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/vishnu_a_m.jpg", 
            name: "Vishnu A M", 
            position: "Member" 
        },
    ];

    const CommunicationSocietyDatas = [
        { 
            imageSrc: "/images/vishnupriya_sreejish.jpg", 
            name: "Vishnupriya Sreejish", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/anviya_shiju.jpg", 
            name: "Anviya Shiju", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/sidharth_nambidi_sha.png", 
            name: "Sidharth Nambidi Sha", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/amrutha_i_m.jpg", 
            name: "Amrutha I M", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/ajey_balaganesh.jpg", 
            name: "Ajey Balaganesh", 
            position: "Member" 
        },
    ];

    const ControlSystemsSocietyDatas = [
        { 
            imageSrc: "/images/riyan_varghese.jpg", 
            name: "Riyan Varghese", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/aflah_m_m.jpg", 
            name: "Aflah M M", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/akash_thekkepanakkal_jayantha.jpg", 
            name: "Akash Thekkepanakkal Jayantha", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/mohammed_shahid.jpg", 
            name: "Mohammed Shahid", 
            position: "Member" 
        },
    ];

    const ComputerSocietyDatas = [
        { 
            imageSrc: "/images/ryan_m.jpg", 
            name: "Ryan M", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/suryakiran_s.jpg", 
            name: "Suryakiran S", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/falah_mohammed.jpg", 
            name: "Falah Mohammed", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/anagha_s.jpg", 
            name: "Anagha S", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/gouri_cv.jpeg", 
            name: "Gouri cv", 
            position: "Member" 
        },
    ];

    const SpecialInterestGroupOnHumanitarianTechnology = [
        { 
            imageSrc: "/images/abdullah_amir_p.jpeg", 
            name: "Abdullah Amir P", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/josekutty_biju.png", 
            name: "Josekutty Biju", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/amal_s_babu.jpg", 
            name: "Amal S Babu", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/al_muneer.jpg", 
            name: "Al Muneer", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/devananda_mb.jpeg", 
            name: "Devananda MB", 
            position: "Member" 
        },
    ];

    const PESSocietyDatas = [
        { 
            imageSrc: "/images/sanjay_r_senan.jpg", 
            name: "Sanjay R Senan", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/karthik.jpg", 
            name: "Karthik", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/alan_anil.jpg", 
            name: "Alan Anil", 
            position: "Member" 
        },
    ];

    const PELSSocietyDatas = [
        { 
            imageSrc: "/images/rithwik_d.jpg", 
            name: "Rithwik D", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/nephin_joe_vinod.jpg", 
            name: "Nephin Joe Vinod", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/aiswarya_pramod.jpg", 
            name: "Aiswarya Pramod", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/ritwik_s_nambiar.jpg", 
            name: "Ritwik S Nambiar", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/sreenandh_p_s.jpeg", 
            name: "Sreenandh P S", 
            position: "Member" 
        },
    ];

    const AESSSocietyDatas = [
        { 
            imageSrc: "/images/mohammed_adil_k.jpg", 
            name: "Mohammed Adil K", 
            position: "Chairperson" 
        },
        {
            imageSrc: "/images/adithyan_c_s.jpg", 
            name: "Adithyan C S", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/dimel.jpg", 
            name: "Dimel", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/karthik_s_pillai.jpg", 
            name: "Karthik S Pillai", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/muhammed_safwan_farook.jpg", 
            name: "Muhammed Safwan Farook", 
            position: "Member" 
        },
    ];

    const CircuitsAndSystemsSocietyDatas = [
        { 
            imageSrc: "/images/ashly_skariah.jpg", 
            name: "Ashly Skariah", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/sara_shameen.jpg", 
            name: "Sara Shameen", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/lakshminarasimhan_r.jpg", 
            name: "Lakshminarasimhan.R", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/p_pujitharam.jpg", 
            name: "P. PujithaRam", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/neyyilla_varshitha.jpg", 
            name: "Neyyilla Varshitha", 
            position: "Member" 
        },
    ];

    const SensorCouncilDatas = [
        { 
            imageSrc: "/images/sreekanth_t_s.jpg", 
            name: "Sreekanth T S", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/neeraj_m.jpg", 
            name: "Neeraj M", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/aadhitya_jaganath_l.jpeg", 
            name: "Aadhitya Jaganath L", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/ganga_suresh.jpg", 
            name: "Ganga Suresh", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/dilan_a_l.jpg", 
            name: "Dilan A L", 
            position: "Member" 
        },
    ];

    const SignalProcessingSociety = [
        { 
            imageSrc: "/images/jumana_faby_khan.jpg", 
            name: "Jumana Faby Khan", 
            position: "Chairperson" 
        },
        { 
            imageSrc: "/images/nandana_r.jpg", 
            name: "Nandana R", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/sajin_sajeev.jpg", 
            name: "Sajin Sajeev", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/saaidh_sadh.jpg", 
            name: "Saaidh Sadh", 
            position: "Member" 
        },
        { 
            imageSrc: "/images/nithesh_narayanan_parthiban.jpg", 
            name: "Nithesh Narayanan Parthiban", 
            position: "Member" 
        },
    ];


    return (
        <div className={styles.homeContainer}>
            <Header />

            {/* the top 3 */}
            <div className={styles.top3}>
                <Card key={0} data={top3Datas[1]} />
                <div className={styles.top3Main}>
                    <Card key={1} data={top3Datas[0]} />
                </div>
                <Card key={2} data={top3Datas[2]} />
            </div>

            {/* the 3x3 grid */}
            <div className={styles.cardsGrid}>
                {top3GridDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            {/* the rest */}
            <div className={styles.topRest}>
                {topRestDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Circuits And Systems Society" />
            <div className={styles.cardsGrid}>
                {CircuitsAndSystemsSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Communication Society" />
            <div className={styles.cardsGrid}>
                {CommunicationSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Computer Society" />
            <div className={styles.cardsGrid}>
                {ComputerSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Control Systems Society" />
            <div className={styles.cardsGrid}>
                {ControlSystemsSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Electron Device Society  (EDS)" />
            <div className={styles.cardsGrid}>
                {ElectronDeviceSociety.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Education Society (EdSoc)" />
            <div className={styles.cardsGrid}>
                {EducationSociety.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Industry Application Society  (IAS)" />
            <div className={styles.cardsGrid}>
                {IndustryApplicationsSociety.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Robotics and Automation Society  (RAS)" />
            <div className={styles.cardsGrid}>
                {RoboticsAndAutomationSociety.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Special Interest Group on Humanitarian Technology (SIGHT)" />
            <div className={styles.cardsGrid}>
                {SpecialInterestGroupOnHumanitarianTechnology.map(
                    (data, index) => (
                        <Card key={index} data={data} />
                    )
                )}
            </div>

            <HeadNameCard text="Power & Energy Society (PES)" />
            <div className={styles.cardsGrid}>
                {PESSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

          
            <HeadNameCard text="Power Electronics Society (PELS)" />
            <div className={styles.cardsGrid}>
                {PELSSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            
            <HeadNameCard text="Aerospace and Electronic Systems Society (AESS)" />
            <div className={styles.cardsGrid}>
                {AESSSocietyDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

           
            <HeadNameCard text="Sensor Council" />
            <div className={styles.cardsGrid}>
                {SensorCouncilDatas.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>
            
            <HeadNameCard text="Signal Processing Society (SPS)" />
            <div className={styles.cardsGrid}>
                {SignalProcessingSociety.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>

            <HeadNameCard text="Women In Engineering (WIE)" />
            <div className={styles.cardsGrid}>
                {WomenInEngineering.map((data, index) => (
                    <Card key={index} data={data} />
                ))}
            </div>
        </div>
    );
};

export default ourTeam;
