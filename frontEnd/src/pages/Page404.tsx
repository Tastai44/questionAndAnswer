/** @format */

import React from "react";
import { themeApp } from "../utils/Theme";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Page404() {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				display: "flex",
				gap: "10px",
				flexDirection: "column",
				textAlign: "center",
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				[themeApp.breakpoints.down("sm")]: {
					width: "90%",
				},
				[themeApp.breakpoints.up("md")]: {
					width: "70%",
				},
				[themeApp.breakpoints.up("lg")]: {
					width: "50%",
				},
			}}
		>
			<p
				style={{
					fontFamily: "Inter",
					fontSize: "36px",
					fontWeight: "bold",
					color: "#2ECC71",
					marginBottom: "12px",
				}}
			>
				404 is not found
			</p>
			<p
				style={{
					fontFamily: "Inter",
					fontSize: "17px",
					color: "#6C6C6C",
					marginBottom: "12px",
				}}
			>
				Page Not found
			</p>
			<p
				style={{
					fontFamily: "Inter",
					fontSize: "13px",
					color: "#6C6C6C",
					marginBottom: "24px",
				}}
			>
				Sorry, we can’t find the page that you are looking for.
			</p>
			<Box style={{ display: "flex", justifyContent: "center" }}>
				<Button
					onClick={() => navigate("/")}
					style={{
						fontFamily: "Inter",
						width: "170px",
						height: "49px",
						backgroundColor: "#2AC75F",
						color: "#F7F7F7",
					}}
				>
					Continue
				</Button>
			</Box>
		</Box>
	);
}
