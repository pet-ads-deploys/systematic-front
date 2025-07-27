import { Flex } from "@chakra-ui/react";
import ContactCard from "./subComponent/ContactCard";
import EmailArea from "./subComponent/EmailArea";

export default function ContactSection() {
    return (
        <Flex justifyContent="center">
            <Flex wrap={"wrap"} w="500px" h="500px" gap="20px">
                <ContactCard icon={""} title={"Nosso escritório principal"} text={"Rua dos Bobos, nº 0"} />
                <ContactCard icon={""} title={"Número de telefone"} text={"(16) 98765-4321"} />
                <ContactCard icon={""} title={"Fax"} text={"(16) 98765-4321"} />
                <ContactCard icon={""} title={"O email"} text={"nosso_email@gmail.com.br"} />
            </Flex>
            <EmailArea title={"Entre em contato conosco"} buttonText={"Enviar"} />
        </Flex>
    );
}