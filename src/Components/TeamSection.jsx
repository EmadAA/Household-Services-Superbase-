
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import AdilImg from '../assets/images/Adil.png';
import JW from "../assets/images/jw.jpeg";
import KJH from "../assets/images/kjh.png";
import Mukter from "../assets/images/mukter.jpg";
import FISImg from '../assets/images/shuvon.png';
import TeamMemberCard from '../Components/TeamMemberCard';

const TeamSection = ({
  title = 'Meet Our Team',
  subtitle = 'We have an expert team',
  teamMembers = [
    {
      name: 'Kaji Jahid Hasan',
      role: 'Supervisor',
      image: KJH,
      socialLinks: { facebook: '#', linkedin: '#', instagram: '#' , github:'#'},
    },
    {
      name: 'Emad Uddin Adil',
      role: 'Frontend Developer',
      image: AdilImg,
      socialLinks: { facebook: 'https://www.facebook.com/emad.adil.509', linkedin: 'https://www.linkedin.com/in/emad-uddin-adil-430851214/', instagram: 'https://www.instagram.com/adilemaduddin/' , github:'https://github.com/EmadAA'},
    },
    {
      name: 'Farhan Israk Shuvon',
      role: 'Backend Developer',
      image: FISImg,
      socialLinks: { facebook: 'https://www.facebook.com/farhanisrak.shuvon', linkedin: 'https://www.linkedin.com/in/farhan-israk-shuvon-630540287/', instagram: 'https://www.instagram.com/farhanshuvon?igsh=MWRnaHlqcmNyOXc2aQ==' , github:'https://github.com/FarhanShuvon'},
    },
    {
      name: 'Mukter Hussen',
      role: 'Designer',
      image: Mukter,
      socialLinks: { facebook: 'https://www.facebook.com/mukterhussen.roki', linkedin: 'https://www.linkedin.com/', instagram: 'https://www.instagram.com/mukter_71?igsh=MXIwOXBqb3E1djVheg==', github:'https://github.com/muk63' },
    },
     {
      name: 'Testing',
      role: 'Test',
      image: JW,
      socialLinks: { facebook: 'https://www.facebook.com/', linkedin: 'https://www.linkedin.com/', instagram: 'https://www.instagram.com/' , github:'https://www.github.com/' },
    },
  ],
  sectionId = 'team',
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id={sectionId} className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-1 bg-teal-600"></div>
            <span className="text-md font-semibold text-teal-600 uppercase tracking-wider mx-2">{title}</span>
            <div className="w-16 h-1 bg-teal-600"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">{subtitle}</h2>
        </div>

        {/* Slider */}
        <div className="px-5 mx-5"> {/* Optional padding for side spacing */}
          <Slider {...settings}>
            {teamMembers.map((member, index) => (
              <div key={index} className="outline-none px-2">
                <TeamMemberCard {...member} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;