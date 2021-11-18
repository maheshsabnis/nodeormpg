sequelize-auto -h localhost -d business -u maheshadmin -x P@ssw0rd_ -p 5433  --dialect postgres -o models -t Department Employee

-- Working 
sequelize-auto -h localhost -d business -u maheshadmin -x P@ssw0rd_ -p 5433  --dialect postgres -o models -l esm
-- Using Table Names (Use lowercase names)
 sequelize-auto -h localhost -d business -u maheshadmin -x P@ssw0rd_ -p 5433  --dialect postgres -o models -t department employee -l esm

 // const sequelize = new Sequelize('postgres://maheshadmin:P@ssw0rd_@localhost:5433/business');
