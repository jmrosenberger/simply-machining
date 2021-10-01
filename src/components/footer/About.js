import React from "react"
import Figure from 'react-bootstrap/Figure'
import FigureImage from 'react-bootstrap/FigureImage'
import FigureCaption from 'react-bootstrap/FigureCaption'
import "./About.css"


export const About = () => {
    return (
        <>
            <h2 className="heading__about">Simply Machining®</h2>
            <div className="image__container">
                <div className="image__1">
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="machine_shop_1.png"
                        />
                        <Figure.Caption>
                            Simply Machining® is a small operation 
                            that far exceeds industry standards to fit 
                            your needs
                        </Figure.Caption>
                    </Figure>
                </div>
                <div className="image__2">
                    <Figure>
                        <Figure.Image
                            width={171}
                            height={180}
                            alt="171x180"
                            src="machine_shop2.png"
                        />
                        <Figure.Caption>
                            Hard at work
                        </Figure.Caption>
                    </Figure>
                </div>
            </div>
        </>
    )
}