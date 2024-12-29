// prettier-ignore
const profile_imgs_name_list = ['Garfield', 'Tinkerbell', 'Annie', 'Loki', 'Cleo', 'Angel', 'Bob', 'Mia', 'Coco', 'Gracie', 'Bear', 'Bella', 'Abby', 'Harley', 'Cali', 'Leo', 'Luna', 'Jack', 'Felix', 'Kiki'] as const;

const profile_imgs_collections_list = ['notionists-neutral', 'adventurer-neutral', 'fun-emoji'] as const;

const generateProfilePicture = () => {
  return `https://api.dicebear.com/6.x/${
    profile_imgs_collections_list[Math.floor(Math.random() * profile_imgs_collections_list.length)]
  }/svg?seed=${profile_imgs_name_list[Math.floor(Math.random() * profile_imgs_name_list.length)]}`;
};

export default generateProfilePicture;
