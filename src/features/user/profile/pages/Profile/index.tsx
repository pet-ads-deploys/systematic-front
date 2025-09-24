// External library
import { useEffect, useState } from "react";
import { Box, Button, Circle, Flex, Text } from "@chakra-ui/react";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { FaCheckCircle } from "react-icons/fa";

// Service
import useProfile from "@features/user/profile/services/useProfile";
import useUpdateProfile from "@features/user/profile/services/useUpdateProfile";

// Components
import FlexLayout from "@components/structure/Flex/Flex";
import Header from "@components/structure/Header/Header";
import SkeletonLoader from "@components/feedback/Skeleton";
import toaster from "@components/feedback/Toaster";
import InputText from "@components/common/inputs/InputText";
import CardDefault from "@components/common/cards";

// Guards
import { isLeft } from "@features/shared/errors/pattern/Either";

// Types
import type { Profile, UpdateProfileDTO, Mode } from "../../types";

// Utils
import { splitInitialCaracter } from "../../utils/helpers/formatters/SplitInitialCarater";

// Constants
const defaultUserProfile: Profile = {
  userId: "",
  username: "",
  name: "",
  email: "",
  affiliation: "",
  country: "",
  authorities: [],
};

const defaultUpdateUserProfile: UpdateProfileDTO = {
  name: "",
  email: "",
  affiliation: "",
  country: "",
};

export default function Profile() {
  const [userProfile, setUserProfile] = useState<Profile>(defaultUserProfile);
  const [updateProfile, setUpdateProfile] = useState<UpdateProfileDTO>(
    defaultUpdateUserProfile
  );
  const [isUpdateMode, setIsUpdateMode] = useState<Mode>("DEFAULT");

  const { profile, isLoading } = useProfile();
  const { update } = useUpdateProfile();
  const toast = toaster();

  useEffect(() => {
    if (!profile) return;

    if (isLeft(profile)) {
      toast({
        status: "error",
        title: "Failed to load profile",
        description:
          profile.value.message ||
          "We couldn’t load your profile data. Please check your connection or try again later.",
      });
      return;
    }

    setUserProfile(profile.value);

    const { name, email, affiliation, country } = profile.value;

    setUpdateProfile({
      name,
      email,
      affiliation,
      country,
    });
  }, [profile]);

  const handleChangeUserProfile = (
    key: keyof UpdateProfileDTO,
    value: string
  ) => {
    setUpdateProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSetModeScreen = () => {
    setIsUpdateMode((prev) => (prev === "DEFAULT" ? "UPDATE" : "DEFAULT"));
  };

  const hasInformationDifferent = () =>
    Object.keys(updateProfile).some(
      (key) =>
        updateProfile[key as keyof UpdateProfileDTO] !==
        userProfile[key as keyof UpdateProfileDTO]
    );

  const handleSubmitUpdate = async () => {
    if (!hasInformationDifferent()) {
      toast({
        status: "warning",
        title: "No changes detected",
        description: "Update at least one field to save the changes.",
      });
      return;
    }

    const result = await update(updateProfile);

    if (!result) return;

    if (isLeft(result)) {
      toast({
        status: "warning",
        title: "Validation error",
        description: result.value.message,
      });
      return;
    }

    const { country, email, name, affiliation, invalidEntries } = result.value;

    if (invalidEntries.length > 0) {
      invalidEntries.forEach((entry) => {
        toast({
          status: "error",
          title: `Invalid ${entry.field}`,
          description:
            entry.message || `The value "${entry.entry}" is invalid.`,
        });
      });
      return;
    }

    setUserProfile((prev) => ({
      ...prev,
      name,
      country,
      email,
      affiliation,
    }));
    setUpdateProfile((prev) => ({
      ...prev,
      name,
      country,
      email,
      affiliation,
    }));
    toast({
      status: "success",
      title: "Profile updated",
      description: "Your changes were saved successfully.",
    });
    setIsUpdateMode("DEFAULT");
  };

  const { username, name, email, affiliation, country } = userProfile;

  const initialCaracter = splitInitialCaracter(name ?? username) || "U";

  const isActiveUpdateMode = isUpdateMode !== "DEFAULT";

  return (
    <FlexLayout navigationType="Default">
      <Header text="My Profile" />
      <CardDefault backgroundColor="white" borderRadius="1rem">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          height="100%"
        >
          <Box width="80%" height="calc(100% - 2rem)">
            {isLoading ? (
              <SkeletonLoader width="100%" height="100%" />
            ) : (
              <Box
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                h="100%"
                padding="1rem"
                overflowX="auto"
              >
                <Flex
                  width="100%"
                  height="20%"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="1rem"
                >
                  <Circle
                    size="10rem"
                    bg="blue.500"
                    color="white"
                    fontSize="5xl"
                    fontWeight="bold"
                    shadow="md"
                  >
                    {initialCaracter}
                  </Circle>
                  <Box>
                    <Text fontSize="4xl" fontWeight="bold">
                      {name ?? username}
                    </Text>
                    <Flex alignItems="center" gap=".5rem" color="gray.600">
                      <Text>{username}</Text>
                    </Flex>
                  </Box>
                </Flex>
                <Box gap="1rem">
                  <Box mb="2rem">
                    <InputText
                      width="calc(100% - 2rem)"
                      nome="name"
                      label="Full Name"
                      type="text"
                      placeholder="Name"
                      value={isActiveUpdateMode ? updateProfile.name : name}
                      onChange={(event) =>
                        handleChangeUserProfile("name", event.target.value)
                      }
                      isDisabled={!isActiveUpdateMode}
                    />
                    <InputText
                      width="calc(100% - 2rem)"
                      nome="email"
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={isActiveUpdateMode ? updateProfile.email : email}
                      onChange={(event) =>
                        handleChangeUserProfile("email", event.target.value)
                      }
                      isDisabled={!isActiveUpdateMode}
                    />
                    <InputText
                      width="calc(100% - 2rem)"
                      nome="affiliation"
                      label="Affiliation"
                      type="text"
                      placeholder="Affiliation"
                      value={
                        isActiveUpdateMode
                          ? updateProfile.affiliation
                          : affiliation
                      }
                      onChange={(event) =>
                        handleChangeUserProfile(
                          "affiliation",
                          event.target.value
                        )
                      }
                      isDisabled={!isActiveUpdateMode}
                    />
                    <InputText
                      width="calc(100% - 2rem)"
                      nome="country"
                      label="Country"
                      type="text"
                      placeholder="Country"
                      value={
                        isActiveUpdateMode ? updateProfile.country : country
                      }
                      onChange={(event) =>
                        handleChangeUserProfile("country", event.target.value)
                      }
                      isDisabled={!isActiveUpdateMode}
                    />
                  </Box>
                  <Flex justifyContent="end" gap="2rem">
                    {isActiveUpdateMode ? (
                      <Button
                        leftIcon={<CloseIcon color="white" fontSize=".75rem" />}
                        colorScheme="red"
                        color="white"
                        variant="solid"
                        onClick={handleSetModeScreen}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        leftIcon={<EditIcon fontSize="1.25rem" />}
                        colorScheme="blue"
                        color="black"
                        variant="outline"
                        onClick={handleSetModeScreen}
                      >
                        Update
                      </Button>
                    )}
                    {isActiveUpdateMode && (
                      <Button
                        leftIcon={<FaCheckCircle fontSize="1rem" />}
                        bg="green.500"
                        color="white"
                        variant="solid"
                        onClick={handleSubmitUpdate}
                      >
                        Update
                      </Button>
                    )}
                  </Flex>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </CardDefault>
    </FlexLayout>
  );
}
