/** @format */

import React from "react";
import {
	Box,
	Typography,
	Divider,
	Button,
	Modal,
	IconButton,
} from "@mui/material";
import { themeApp } from "../utils/Theme";

import CloseIcon from "@mui/icons-material/Close";

interface IData {
	id: string;
	open: boolean;
	discard: boolean;
}

export default function ConfirmModalCard(props: IData) {
	return (
		<Modal open={props.open}>
			<Box
				sx={{
					position: "absolute",
					top: "40%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					bgcolor: "background.paper",
					boxShadow: 24,
					borderRadius: "20px",
					width: "90%",
					[themeApp.breakpoints.up("md")]: {
						width: "398px",
					},
				}}
			>
				<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography
							sx={{
								marginTop: "14px",
								textAlign: "left",
								marginLeft: "14px",
								fontWeight: "medium",
							}}
						>
							{props.discard ? "Unsaved Change" : "Delete question?"}
						</Typography>
						<IconButton
							sx={{
								color: "black",
								bgcolor: "#F7F7F7",
								marginRight: "14px",
								alignItems: "center",
							}}
						>
							<CloseIcon />
						</IconButton>
					</Box>

					<Divider
						sx={{
							width: "100%",
							marginTop: "14px",
							border: "0.5px solid #C9CCD0",
						}}
					/>

					<Box
						sx={{ marginTop: "24px", textAlign: "left", marginLeft: "14px" }}
					>
						{props.discard
							? "Changes you made will not be saved"
							: "Deleting question is permanent and cannot be undone"}
					</Box>

					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							textAlign: "left",
							marginLeft: "14px",
							width: "100%",
						}}
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Box sx={{ display: "flex", justifyContent: "center" }}>
								<Button
									sx={{
										width: "181px",
										borderRadius: "8px",
										background: "white",
										color: "black",
										marginTop: "24px",
										marginRight: props.discard ? "none" : "10px",
										marginBottom: "16px",
										height: "49px",
										border: "1px solid #C9CCD0",
										"&:hover": {
											background: "white",
											color: "black",
											border: "1px solid black",
										},
										[themeApp.breakpoints.up("md")]: {
											width: "181px",
										},
									}}
								>
									{props.discard ? "Keep editing" : "Cancel"}
								</Button>
							</Box>
							<Button
								sx={{
									width: "181px",
									borderRadius: "8px",
									background: props.discard ? "#2ECC71" : "#2ECC71",
									color: props.discard ? "black" : "black",
									marginTop: "24px",
									marginBottom: "16px",
									height: "49px",

									border: props.discard ? "none" : "none",
									"&:hover": {
										background: "white",
										color: "black",
										border: "1px solid black",
									},
									[themeApp.breakpoints.up("md")]: {
										width: "181px",
									},
								}}
							>
								{props.discard ? "Discard" : "Delete"}
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
}
