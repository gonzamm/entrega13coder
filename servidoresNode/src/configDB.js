const dotenv = require('dotenv').config();

const config = {
    firebase:{
        "type": "service_account",
        "project_id": "entrega9-d9e7e",
        "private_key_id": process.env.FIREBASEprivatekeyid,
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDWs1666lTGOzUx\nLNcHzMmh9VC0+Ca0f+jGSQHYFTEpzGjHgppB7LLcboi6P6caElb8ONc7EZz0iU2L\nvx+8pF3bWADCCUI2SHVFpJSPI+WI6GadvvxoQSSI5n4Fx/SjIcRIsRk3UzWgpDmP\nuSgVyn1raO3Z4FPdmneC0RcK6J4oJ78RB+wdpE/KKxv0fC/sAAfojdUh2XSU97yJ\nUi6oJSlgPNZvD1LxwlSmKYPc/5nc5/5P581vPkT3lmcyhhyUZ0Hzwz5XWFrlSOcB\nSj6K5LXu+n6UXc5UQ8S9U3mHq5ui4U0U1Lzwi6PL1qnpdBmzDB3poFKV8WI4iMda\nB78ZtCaPAgMBAAECggEAAlMHzAM8brb2YPVo0ItNhYTX3lWvaZXW6cqhi/rSwO6X\nFc3aqKsM1qkVrtqAjx4yteFRpzCOH/GaltA3Yj3vTDAcNf2Oq3LGXj4lY5VSZ1SI\nw91s8x39bMP+Ckb7ZYa4jsboDHrIolgUzXMGNZIvIGoO5SRyE/yXnaFw2+vfxnR+\nn9OpiQbiQKYRMYHgb0JyF8nTreB0cjl7NkkEMljnzdM7yKHMGXuiWsmVjARM03oQ\nSpa9UNjSpb9f0AaQi5UJLWD7uvTja2XQXgKrcE7/UY3yae5EtWXITHeT7dUqAdNo\nYx33OL0cnUa+2SCIUPd2wmI8wg7w27yaROcVuhRv4QKBgQDurNeYRGlBpsQZyJAS\n6eCDpP8iiFHy9CEyoamxafeTf5zETegRRUslf9ADaF7wSLCb/O8dQt7Fqf6ocDPk\nyAGs9AtA3hFj1jttXP25dO6wOz/ozk41ztPQEPBRZ8QiEsjAg4gvvtLNKXv02InN\nlUW7aaDpvepOoQrirntp3XNF7wKBgQDmSQYpYl7bEiXwGpPqFXhUu2C0gr/blmaH\nGkVFXYhGxnPU1su0rGGX/ty3/Ct0E/xLLUE/NM1eQ0028ojbMh46GoqrDHKrLxTG\nvVzGZs6ltLcrMj2MvBq7ZM9CUPEYJVMa5q95Rod1nVp7YZnbABY5a/k5eFbY5RTk\nqw9DUMLJYQKBgFmj5N01ZGrZ3XDpmOLhoAcRYxlvJYggFI/Vk8wkRm3JUfGQaQaD\nhfOxi0icXHvWcS5E0vGkedK3RAOzEGpui+KPTeKxBMsAXRV4BXsv5a2esyQWx90B\nrx/IHNoWJN2/PFLBk9aKztVrLTkKUsc5txTqWRswzt11ModsjMF4AKFVAoGAQbrC\nKXnMfVcWwQu1AHGUYQsCtUNEo9av+QwEjaH+zcTDNxMAHde+G3ZBZbpyZLV3o7WN\nFA9sNuWa2n4rlfUeL5N31Q6+hCHyGi/elTqu7RlB1vCGJO9j6e0CQ3l691tf9yO1\nHjaFX4rEUscu9RV3QniRMFgq4cmxRvuUZbBdiMECgYBoR/hoOzF7NxlWnqN7Lib2\nAEUsHue0k8hcZiRky98wd5z3Iu1WWb1LIwt4kTEQNkQSI4K6tZT7TcB8dn0BPCba\n9P75rcwhl5eEqZFfK9rz9dvV6L4GdtjmbQiOU3lxtsZXyO72j+E52cHOOhP1JYub\nY+Ud3anl61b/Qw2j1CkYJA==\n-----END PRIVATE KEY-----\n",
        "client_email": process.env.FIREBASEclientemail,
        "client_id": process.env.FIREBASEclientid,
        "auth_uri": process.env.FIREBASEauthuri,
        "token_uri": process.env.FIREBASEtokenuri,
        "auth_provider_x509_cert_url": process.env.FIREBASEauthproviderx509certurl,
        "client_x509_cert_url": process.env.FIREBASEclientx509certurl
      },
      mongodb: {
        cnxStr: process.env.MONGODBcnxStr,
    },
      
}

module.exports = config;