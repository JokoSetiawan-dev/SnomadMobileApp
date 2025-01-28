import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, type RegisterFormData } from "@/utils/validationSchemas/registerSchema";
import { authApiClient } from "@/utils/api/authApi";
import { useRouter } from "expo-router";

export function useRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<"buyer" | "seller">("buyer");
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "buyer",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await authApiClient.register({
        name: data.name,
        email: data.email.toLowerCase(),
        role: selectedRole, // Use the selected role
        password: data.password,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        router.push("/login");
      }

      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    isSubmitting,
    error,
    onSubmit: form.handleSubmit(onSubmit),
    selectedRole,
    setSelectedRole,
  };
}