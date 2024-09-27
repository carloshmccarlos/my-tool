'use client';
import React, { useState } from 'react';
import './css/json-comparison.css'

export function JsonComparison() {
    const [json1, setJson1] = useState('');
    const [json2, setJson2] = useState('');
    const [highlightedJson1, setHighlightedJson1] = useState('');
    const [highlightedJson2, setHighlightedJson2] = useState('');

    const handleCompare = () => {
        try {
            const obj1 = JSON.parse(json1);
            const obj2 = JSON.parse(json2);
            const highlighted1 = highlightDifferences(obj1, obj2);
            const highlighted2 = highlightDifferences(obj2, obj1);
            setHighlightedJson1(highlighted1);
            setHighlightedJson2(highlighted2);
        } catch (e) {
            alert(e);
        }
    };

    const highlightDifferences = (obj1, obj2) => {
        const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
        let jsonString = JSON.stringify(obj1, null, 2); // Pretty-print the JSON string

        allKeys.forEach((key) => {
            const value1 = obj1[key];
            const value2 = obj2[key];

            // If the key is missing from one object, color the key and value blue
            if (!(key in obj1) || !(key in obj2)) {
                const keyRegex = new RegExp(`("${key}")`, 'g');
                jsonString = jsonString.replace(keyRegex, `<span style="color: blue;">$1</span>`);

                const valueRegex = new RegExp(`("${key}":\\s*)(${JSON.stringify(value1)})`, 'g');
                jsonString = jsonString.replace(valueRegex, `$1<span style="color: blue;">$2</span>`);
            } else {
                // If values are different, color the value orange
                if (JSON.stringify(value1) !== JSON.stringify(value2)) {
                    const valueRegex = new RegExp(`("${key}":\\s*)(${JSON.stringify(value1)})`, 'g');
                    jsonString = jsonString.replace(valueRegex, `$1<span style="color: orange;">$2</span>`);
                }
            }
        });

        // Escape JSON string for HTML display
        return jsonString;
    };

    return (
        <div >
            <div className={'first'}>
                <label htmlFor="json1">
                    Your First JSON String
                </label>
                <div
                    id="json1"
                    style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}
                    contentEditable={true}
                    onInput={(e) => setJson1(e.currentTarget.textContent)}
                    dangerouslySetInnerHTML={{ __html: highlightedJson1 || json1 }}
                    className={'first'}
                />
            </div>
            <div className='second'>
                <label htmlFor="json2" className="block text-sm font-medium text-gray-700">
                    Your Second JSON String
                </label>
                <div
                    className={'second'}
                    id="json2"
                    style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}
                    contentEditable={true}
                    onInput={(e) => setJson2(e.currentTarget.textContent)}
                    dangerouslySetInnerHTML={{ __html: highlightedJson2 || json2 }}
                />
            </div>
            <button
                className={'button'}
                onClick={handleCompare}
            >
                Compare
            </button>

            {/*<div className="mt-4">*/}
            {/*    <h2 className="text-lg font-semibold">Comparison Result:</h2>*/}
            {/*    <strong>The First Json</strong>*/}
            {/*    <div*/}
            {/*        id="h1"*/}
            {/*        dangerouslySetInnerHTML={{ __html: highlightedJson1 }}*/}
            {/*        className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto whitespace-pre-wrap"*/}
            {/*        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}*/}
            {/*    />*/}
            {/*    <strong>The Second Json</strong>*/}
            {/*    <div*/}
            {/*        id="h2"*/}
            {/*        dangerouslySetInnerHTML={{ __html: highlightedJson2 }}*/}
            {/*        className="mt-2 p-2 border border-gray-300 rounded-md shadow-sm overflow-y-auto whitespace-pre-wrap"*/}
            {/*        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
}
