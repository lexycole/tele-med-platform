const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // const countries = [
  //   { name: "United States", flag: "https://example.com/us-flag.png" },
  //   { name: "Canada", flag: "https://example.com/canada-flag.png" },
  //   { name: "United Kingdom", flag: "https://example.com/uk-flag.png" },
  //   { name: "France", flag: "https://example.com/france-flag.png" },
  //   { name: "Germany", flag: "https://example.com/germany-flag.png" },
  //   { name: "Japan", flag: "https://example.com/japan-flag.png" },
  //   { name: "Australia", flag: "https://example.com/australia-flag.png" },
  //   { name: "Brazil", flag: "https://example.com/brazil-flag.png" },
  //   { name: "India", flag: "https://example.com/india-flag.png" },
  //   { name: "South Africa", flag: "https://example.com/south-africa-flag.png" },
  // ]

  // for (let country of countries) {
  //   await prisma.country.create({
  //     data: country,
  //   })
  // }

  // async function deleteAllCountries() {
  //   try {
  //     const deletedCountries = await prisma.country.deleteMany()
  //     console.log(`Deleted ${deletedCountries.count} country`)
  //   } catch (error) {
  //     console.error('Error deleting all country:', error)
  //   }
  // }
  
  // deleteAllCountries()

  await prisma.cOA.createMany({
    data: [
      { name: 'Office Supplies', category: 'Expenses' },
      { name: 'Utilities', category: 'Expenses' },
      { name: 'Travel Expenses', category: 'Expenses' },
    ],
  });

    // async function deleteAllCoa() {
    //   try {
    //     const deletedCoas = await prisma.cOA.deleteMany()
    //     console.log(`Deleted ${deletedCoas.count} cOA`)
    //   } catch (error) {
    //     console.error('Error deleting all cOA:', error)
    //   }
    // }
  
    // deleteAllCoa()

  // const patients = [
  //   {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     birthDate: new Date('1980-01-01'),
  //     imageSrc: '',
  //     gender:     '', 
  //     prefix :    '',
  //     mobile:     '123456789',
  //     productName: '',
  //     quantity:   '',
  //     price:      '',
  //     amount:     '',
  //     currency:   '',
  //     reference:  '',
  //     status:     '',
  //     note:       '',
  //     patient:    '',
  //   },
  //   {
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     birthDate: new Date('1990-05-15'),
  //     imageSrc: '',
  //     gender:     '', 
  //     prefix :    '',
  //     mobile:     '987654321',
  //     productName: '',
  //     quantity:   '',
  //     price:      '',
  //     amount:     '',
  //     currency:   '',
  //     reference:  '',
  //     status:     '',
  //     note:       '',
  //     patient:    '',
  //   },
  //   {
  //     firstName: 'Michael',
  //     lastName: 'Brown',
  //     birthDate: new Date('1975-12-30'),
  //     imageSrc: '',
  //     gender:     '', 
  //     prefix :    '',
  //     mobile:     '555123456',
  //     productName: '',
  //     quantity:   '',
  //     price:      '',
  //     amount:     '',
  //     currency:   '',
  //     reference:  '',
  //     status:     '',
  //     note:       '',
  //     patient:    '',
  //   },
  //   {
  //     firstName: 'Alice',
  //     lastName: 'Johnson',
  //     birthDate: new Date('1985-07-21'),
  //     imageSrc: '',
  //     gender:     '', 
  //     prefix :    '',
  //     mobile:     '444555666',
  //     productName: '',
  //     quantity:   '',
  //     price:      '',
  //     amount:     '',
  //     currency:   '',
  //     reference:  '',
  //     status:     '',
  //     note:       '',
  //     patient:    '',  
  //   },
  // ];
  
  // for (const patient of patients) {
  //   await prisma.patient.create({
  //     data: patient,
  //   });
  // }
  // async function deleteAllPatients() {
  //   try {
  //     const deletedPatients = await prisma.patient.deleteMany()
  //     console.log(`Deleted ${deletedPatients.count} patients`)
  //   } catch (error) {
  //     console.error('Error deleting all patients:', error)
  //   }
  // }
  
  // deleteAllPatients()


}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })