import React, { useContext, useEffect } from "react";
import Button from "../../components/Button/Button";
import MaterialIcons from "../../components/MaterialIcons";
import GlobalContext from "../../Context/GlobalContext";
import "./dialog.css";

let a = "indigo";

const Dialog = ({
	title = "",
	close = () => console.log("close dialog box"),
	cta = {
		text: "Save",
		icon: "save",
		color: "indigo",
		action: () => console.log(),
	},
	children,
	color = a,
	bodyStyle,
}) => {
	const { theme, accentColor } = useContext(GlobalContext);
	a = accentColor;
	useEffect(() => {
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape") close();
		});
		return () => {
			document.removeEventListener("keydown", (e) => {
				if (e.key === "Escape") close();
			});
		};
	}, [close]);
	return (
		<section className="dialog" data-aos="fade-up">
			<div
				className="dialog-head"
				style={{
					backgroundColor: `var(--${color}-${
						theme === "light" ? "100" : "700"
					})`,
				}}
			>
				<div className="dialog-head-left">
					<button className="dialog-head-close icon" onClick={close}>
						<MaterialIcons>close</MaterialIcons>
					</button>
					{title !== "" && (
						<span className="dialog-head-title">{title}</span>
					)}
				</div>
				<div className="dialog-head-right">
					<Button
						text={cta?.text}
						onClick={cta?.action ? cta.action : () => console.log()}
						color={cta?.color ? cta.color : accentColor}
						icon={cta?.icon ? cta?.icon : "save"}
					/>
				</div>
			</div>
			<div className="dialog-body" style={bodyStyle}>
				{children}
			</div>
		</section>
	);
};

export default Dialog;
