import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationRail } from "@/core/ui/components";
import { Avatar } from '@mui/material/Avatar';
import {
  MdMenu, MdAttachFile, MdMail, MdFavorite, MdMap, MdMessage
} from 'react-icons/md'; 

function NavigationComponent() {
  const handleClick = (event) => {
    // Placeholder for click event logic
    console.log("Navigation item clicked:", event);
  };

  return (
    <NavigationRail
      top={
        <>
          <NavigationRail.Item icon={<MdMenu size={24} />} onClick={handleClick} />
        </>
      }
      center={
        <>
          <NavigationRail.Item component={Link} to="/"
            icon={<MdAttachFile size={24} />}
            label={"Accueil"}
          />
          <NavigationRail.Item component={Link} to="/Liste"
            icon={<MdMail size={24} />}
            onClick={handleClick}
            label={"Liste"}
          />
          <NavigationRail.Item component={Link} to="/Nouveau"
            icon={<MdFavorite size={24} />}
            onClick={handleClick}
            label={"Nouveau"}
          />
          <NavigationRail.Item component={Link} to="/Profil"
            icon={<MdMap size={24} />}
            onClick={handleClick}
            label={"Profil"}
          />
          <NavigationRail.Item component={Link} to="/Admin"
            icon={<MdMessage size={24} />}
            onClick={handleClick}
            label={"Admin"}
          />
        </>
      }
      bottom={
        <>
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={"https://images.unsplash.com/photo-1665174271625-178021f8b1a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"}
          />
        </>
      }
    />
  );
}

export default NavigationComponent;
