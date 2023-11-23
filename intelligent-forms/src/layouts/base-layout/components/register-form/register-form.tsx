import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createUser } from "../../../../features/auth/api";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";
import "./register-form.css";

export const Register = () => {
  const FormSchema = z.object({
    name: z.string().min(1, "Name cannot be null").max(30),
    address: z.string().min(1, "Address cannot be null").max(30),
    email: z.string().email().max(30),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    userType: z.string(),
    fiscalCode: z.string().optional(),
    subscriptionPlan: z.string().default("free"),
  });

  type FormSchemaType = z.infer<typeof FormSchema>;

  const toast = useRef<Toast | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "User created successfully",
      });
    }
  };

  const showError = () => {
    if (toast.current) {
      toast.current.show({
        severity: "error",
        summary: "Info",
        detail: "User already exists",
      });
    }
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    createUser(data)
      .then((response: any) => {
        showSuccess();
        navigate("/login");
      })
      .catch((error: any) => {
        showError();
      });
  };

  return (
    <div className="login-form">
      <div className="login-header">
        <Toast ref={toast} />
        <p className="title">Începeți</p>
        <p className="description">Creează-ți contul acum</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-field">
          <select
            id="userType"
            {...register("userType")}
            className="custom-select"
          >
            <option selected value="Company">
              Numele instituției
            </option>
            <option value="Individual">Persoană fizică</option>
            <option value="Public Institution">Insituție publică</option>
          </select>
        </div>
        <div className="p-field">
          {watch().userType === "Individual" ? (
            <span />
          ) : (
            <div className="p-field">
              <span>
                <div className="input-icons">
                  <i
                    className="pi pi-dollar icon"
                    style={{ fontSize: "30px" }}
                  />
                  <input
                    {...register("fiscalCode")}
                    className="input-text"
                    placeholder="Cod fiscal"
                  />
                </div>
                {errors.fiscalCode && (
                  <span className="form-error">
                    {errors.fiscalCode.message}
                  </span>
                )}
              </span>
            </div>
          )}
        </div>
        <div className="p-field">
          <span>
            <div className="input-icons">
              <i className="pi pi-id-card icon" style={{ fontSize: "30px" }} />
              <input
                type="text"
                {...register("name")}
                className="input-text"
                placeholder="Nume"
              />
            </div>
            {errors.name && (
              <span className="form-error">{errors.name.message}</span>
            )}
          </span>
        </div>
        <div className="p-field">
          <span>
            <div className="input-icons">
              <i className="pi pi-home icon" style={{ fontSize: "30px" }} />
              <input
                type="text"
                {...register("address")}
                className="input-text"
                placeholder="Adresa"
              />
            </div>
            {errors.address && (
              <span className="form-error">{errors.address.message}</span>
            )}
          </span>
        </div>
        <div className="p-field">
          <span>
            <div className="input-icons">
              <i className="pi pi-envelope icon" style={{ fontSize: "30px" }} />
              <input
                type="email"
                {...register("email")}
                className="input-text"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </span>
        </div>
        <div className="p-field">
          <span>
            <div className="input-icons">
              <i className="pi pi-lock icon" style={{ fontSize: "30px" }} />
              <input
                id="password"
                type="password"
                {...register("password")}
                className="input-text"
                placeholder="Parola"
              />
            </div>
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </span>
        </div>
        <div className="p-field">
          <Button className="submit-button" label="Creează contul" type="submit" />
        </div>
      </form>
    </div>
  );
};
