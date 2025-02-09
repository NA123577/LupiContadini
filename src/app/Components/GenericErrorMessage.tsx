'use client';

import { Ref } from "react";

interface GenericErrorMessageProps {
    errorModalDimmer: Ref<HTMLDivElement> | undefined;
    errorModalCard: Ref<HTMLDivElement> | undefined;
    errorMessageHeader: string;
    errorMessageContent: string;
    onModalClose: () => void;
}

export default function GenericErrorMessage(props: GenericErrorMessageProps) {

    return (
        <div ref={props.errorModalDimmer} id="errorModalDimmer" className="ui dimmer modals page transition hidden" style={{ display: 'flex !important' }}>
            <div ref={props.errorModalCard} id="errorModalCard" className="ui mini test modal transition hidden" style={{ display: 'block !important' }}>
                <div className="header">
                    <i className="attention red icon"></i>
                    {props.errorMessageHeader}
                </div>
                <div className="content">
                    <p>{props.errorMessageContent}</p>
                </div>
                <div className="actions" style={{ textAlign: 'center' }}>
                    <div className="ui negative button" onClick={props.onModalClose}>
                        Chiudi
                    </div>
                </div>
            </div>
        </div>
    )
}