const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
};
    const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg)$/));



const companies = [
    {
      name: "Creative Software",
      logo: images['creativesoftware.png'],
      description: "Creative Software is a pioneer in software outsourcing.",
    },
    {
      name: "SLT Mobitel",
      logo: images['sltmobitel.png'],
      description: "SLT Mobitel offers cutting-edge communication solutions.",
    },
    {
      name: "Arimac",
      logo: images['arimac.jpg'],
      description: "Arimac is a leading digital solutions provider.",
    },
    {
      name: "Blue Lotus",
      logo: images['bluelotus.jpg'],
      description: "Blue Lotus specializes in advanced IT services.",
    },
    {
      name: "Parallelx",
      logo: images['parallelx.png'],
      description: "Parallelx is known for their innovative IT solutions.",
    },
    {
      name: "Xiteb",
      logo: images['xiteb.png'],
      description: "Xiteb excels in web and mobile development.",
    },
    {
      name: "Wavenet",
      logo: images['wavenet.png'],
      description: "Wavenet offers solutions in telecommunications.",
    },
  ];

  export default companies;
  