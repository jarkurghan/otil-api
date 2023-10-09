export default {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "swagger of OTIL APIs",
            version: "1.0",
        },
        servers: [
            !process.env.NODE_ENV || process.env.NODE_ENV === "development"
                ? { url: "http://localhost:2006/" }
                : {
                      // url: "https://tts-hrp-api-auth-dev.herokuapp.com/",
                  },
        ],
    },
    apis: ["./src/swagger/UI/*.js"],
};
