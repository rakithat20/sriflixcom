import React from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';


function Footer() {
  const getIsAdmin = () => {
    const isAdmin = localStorage.getItem('isAdmin');
    return isAdmin ? JSON.parse(isAdmin) : false;
  };

  let footerLinks;

  if (!getIsAdmin()) {
    footerLinks = [
      {
        title: 'Company',
        links: [
          { name: 'Home', link: '/' },
          { name: 'About Us', link: '/about-us' },
          { name: 'Contact Us', link: '/contact-us' },
          { name: 'Movies', link: '/movies' }
        ]
      },
      {
        title: 'Top Categories',
        links: [
          { name: 'Action', link: '#' },
          { name: 'Romantic', link: '#' },
          { name: 'Drama', link: '#' },
          { name: 'Historical', link: '#' }
        ]
      },
      {
        title: 'My Account',
        links: [
          { name: 'My Favorites', link: '/favorites' },
          { name: 'Profile', link: '/profile' },
          { name: 'Change Password', link: '/password' }
        ]
      }
    ];
  } else {
    footerLinks = [
      {
        title: 'Company',
        links: [
          { name: 'Home', link: '/' },
          { name: 'About Us', link: '/about-us' },
          { name: 'Contact Us', link: '/contact-us' },
          { name: 'Movies', link: '/movies' }
        ]
      },
      {
        title: 'Top Categories',
        links: [
          { name: 'Action', link: '#' },
          { name: 'Romantic', link: '#' },
          { name: 'Drama', link: '#' },
          { name: 'Historical', link: '#' }
        ]
      },
      {
        title: 'My Account',
        links: [
          { name: 'Dashboard', link: '/dashboard' },
          { name: 'My Favorites', link: '/favorites' },
          { name: 'Profile', link: '/profile' },
          { name: 'Change Password', link: '/password' }
        ]
      }
    ];
  }
  return (
    <div className="bg-dry px-8 border=t-2 border-black rounded-lg">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
          {footerLinks.map((link, index) => (
            <div key={index} className="col-span-1 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0">
              <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">{link.title}</h3>
              <ul className="text-sm flex flex-col space-y-3">
                {link.links.map((text, index) => (
                  <li key={index} className="flex items-baseline">
                    <RouterLink to={text.link} className="text-border inline-block w-full hover:text-subMain">{text.name}</RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link to="/">
              <img src="/images/logo.png" alt="logo" className="w-2/3 object-contain h-12" />
            </Link>
            <p className="leading-7 text-sm text-border mt-3">
              <span>
                National Institute of Business Management (NIBM)
                120/5, Wijerama Mawatha,
                Colombo 07,
                Sri Lanka
              </span>
              <br/>
              <span>Telephone: +94 11 5321 421</span>
              <br/>
              <span>Email: info@nibm.lk</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
