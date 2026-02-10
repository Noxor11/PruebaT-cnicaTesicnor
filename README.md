# Entrevista Tesicnor

El siguiente proyecto es parte de una prueba técnica para la empresa Tesicnor.
Tanto el front como el back tienen archivos READMEs con información más detallada
acerca de la instalación de dependencias y ejecución del código.

Se trata de una prueba de concepto acerca de la obtención de datos a través de una API
y la construcción de una aplicación de visualización de información de películas de
Star Wars Full Stack hecha con React, y Spring Boot.

Se utiliza el inglés como idioma principal en el desarrollo y documentación del proyecto,
a excepción de este primer archivo README.

## Front
### Proceso de ejecución de desarrollo:
- **Instalación de dependencias:** Preferiblemente con pnpm, debido a su velocidad
- **Ejecución en entorno de desarrollo y producción:** `pnpm dev`, `pnpm build` para producir los archivos estáticos para despliegue.
- **Stack utilizado:** React, Typescript, Redux para manejo de estados, vite para la compilación del código.

## Back
### Proceso de ejecución de desarrollo:
- **Configuración inicialí** Se debe establecer tres variables de entorno, así como montar una base de datos PostgreSQL. Las variables de entorno son las siguientes:
    - OMDB_API_KEY: Api key de OMDB.
    - POSTGRES_USERNAME: usuario de postgres
    - POSTGRES_PASSWORD: contraseña de postgres

    La base de datos de postgres por defecto se llama "interview".

- **Instalación de dependencias y ejecución en entorno de desarrollo y producción:** `./mvnw spring-boot:run` en linux, `.\mvnw spring-boot:run` en windows.
- **Stack utilizado:** Spring Boot, Hibernate (JPA), Lombok, patrón de diseño DAO.

