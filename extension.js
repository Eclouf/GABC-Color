const vscode = require('vscode');

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider('gabc', {
            provideCompletionItems(document, position) {
                const completionItems = [];

                
                
                const suggestion = new vscode.CompletionItem('exampleFunction', vscode.CompletionItemKind.Function);
                suggestion.detail = 'This is an example function';
                suggestion.documentation = 'More details about this function';
                completionItems.push(suggestion);

                const headers = [
                    {label:'name:',documentation:"This is the name of the piece, in almost all cases the incipit, the first few words. In the case of the mass ordinary, the form as Kyrie X Alme Pater or Sanctus XI is recommended where appropriate."},
                    {label:'gabc-copyright:',documentation:"This license is the copyright notice (in English) of the gabc file, as chosen by the person named in the transcriber field. As well as the notice itself, it may include a brief description of the license, such as public domain, CC-by-sa; for a list of commonly found open source licenses and exceptions, please see this page. A separate text file will be necessary for the complete legal license. For the legal issues about Gregorian chant scores, please see the legal issues page. An example of this field would be:gabc-copyright:\n CC0-1.0 by Elie Roux, 2009 <http://creativecommons.org/publicdomain/zero/1.0/>;"},
                    {label:'score-copyright:',documentation:"This license is the copyright notice (in english) of the score itself from which the gabc was transcribed. Like the gabc-license, there may be a brief description of the license too. In unclear or complex cases it may be omitted; it is most suitable for use when the transcriber is the copyright holder and licensor of the score as well. One again, reading the page on legal issues is recommended. An example of this field would be:\nscore-copyright: (C) Abbaye de Solesmes, 1934"},
                    {label:'author:',documentation:"The author of the piece, if known; of course, the author of most traditional chant is not known."},
                    {label:'language:',documentation:"The language of the lyrics."},
                    {label:'oriscus-orientation:',documentation:"If legacy, the orientation of an unconnected oriscus must be set manually."},
                    {label:'mode:',documentation:"The mode of the piece. This should normally be an Arabic number between 1 and 8, but may be any text required for unusual cases. The mode number will be converted to Roman numerals and placed above the initial unless one of the following conditions are met:\n  -There is a \greannotation defined immediately prior to \\gregorioscore.\n   -The annotation header field is defined."},
                    {label:'mode-modifier:',documentation:"The mode 'modifier' of the piece. This may be any TeX code to typeset after the mode, if the mode is typeset. If the mode is not typeset, the mode-modifier will also not be typeset."},
                    {label:'mode-differentia:',documentation:"The mode or tone differentia of the piece. Typically, this expresses the variant of the psalm tone to use for the piece. This may be any TeX code to typeset after the mode-modifier, if the mode is typeset. If the mode is not typeset, the mode-differentia will also not be typeset."},
                    {label:'annotation:',documentation:"The annotation is the text to appear above the initial letter. Usually this is an abbreviation of the office-part in the upper line, and an indication of the mode (and differentia for antiphons) in the lower. Either one or two annotation fields may be used; if two are used, the first is the upper line, the second the lower. Example:\n  annotation:Ad Magnif.;\n  annotation:VIII G;\nFull TeX markup is accepted:\n  annotation:{\color{red}Ad Magnif.};\n  annotation:{\color{red}VIII G};\nIf the user already defined annotation(s) in the main TeX file via \greannotation then the annotation header field will not overwrite that definition."},
                    {label:'staff-lines:',documentation:"The number of lines on the staff. You can have as few as 2 lines and as many as 5. If this header is left out, then the default will be the classic 4 line staff."},
                    {label:'office-part:',documentation:"The office-part is the category of chant (in latin), according to its liturgical rôle. Examples are: antiphona, hymnus, responsorium breve, responsorium prolixum, introitus, graduale, tractus, offertorium, communio, kyrie, gloria, credo, sanctus, benedictus, agnus dei."},
                    {label:'occasion:',documentation:"The occasion is the liturgical occasion, in latin. For example, Dominica II Adventus, Commune doctorum, Feria secunda."},
                    {label:'meter',documentation:"For hymns and anything else with repetitive stanzas, the meter, the numbers of syllables in each line of a stanza. For example, 8.8.8.8 for typical Ambrosian-style hymns: 4 lines each of 8 syllables."},
                    {label:'commentary:',documentation:"This is intended for notes about the source of the text, such as references to the Bible."},
                    {label:'arranger:',documentation:"The name of a modern arranger, when a traditional chant melody has been adapted for new words, or when a manuscript is transcribed into square notation. This may be a corporate name, like Solesmes."},
                    {label:'date:',documentation:"The date of composition, or the date of earliest attestation. With most traditional chant, this will only be approximate; e.g. XI. s. for eleventh century. The convention is to put it with the latin style, like the previous examples (capital letters, roman numerals, s for seculum and the dots)."},
                    {label:'manuscript:',documentation:"For transcriptions direct from a manuscript, the text normally used to identify the manuscript, for example Montpellier H.159."},
                    {label:'manuscript-reference:',documentation:"A unique reference for the piece, according to some well-known system. For example, the reference beginning cao in the Cantus database of office chants. If the reference is unclear as to which system it uses, it should be prefixed by the name of the system. Note that this should be a reference identifying the piece, not the manuscript as a whole; anything identifying the manuscript as a whole should be put in the manuscript field."},
                    {label:'manuscript-storage-place:',documentation:"For transcriptions direct from a manuscript, where the manuscript is held; e.g. Bibliothèque Nationale, Paris."},
                    {label:'book:',documentation:"For transcriptions from a modern book (such as Solesmes editions; modern goes back at least to the 19th century revival), the name of the book; e.g. Liber Usualis."},
                    {label:'transcriber',documentation:"The name of the transcriber into gabc."},
                    {label:'transcription-date',documentation:"The date the gabc was written, with the following convention yyyymmdd, like 20090129 for january the 29th 2009."},
                    {label:'user-notes',documentation:"This may contain any text in addition to the other headers -- any notes the transcriber may wish. However, it is recommended to use the specific header fields where they are suitable, so that it is easier to find particular information."}
                ];

                
                const line = document.lineAt(position);
                const lineText = line.text.substr(0, position.character);

                
                if (!lineText.includes('%%')) {
                    headers.forEach(header => {
                        const item = new vscode.CompletionItem(header, vscode.CompletionItemKind.Function);
                        item.detail = 'Gabc file header with variables valid for compilation'; 
                        item.documentation = header.documentation;
                        completionItems.push(item);
                    });
                }
                
                const gregkey = [
                    {label:"(c1)", documentation:'C key first line'},
                    {label:"(c2)", documentation:'C key second line'},
                    {label:"(c3)", documentation:'C key third line'},
                    {label:"(c4)", documentation:'C key fourth line'},
                    {label:"(f3)", documentation:'F key third line'},
                    {label:"(f4)", documentation:'F key fourth line'},
                    {label:"(cb3)", documentation:'C key third line with bemol'},
                    {label:"(c2@c4)", documentation:'C-keys second and fourth row'}
                ];

                // Récupérer la ligne actuelle et le texte avant la position du curseur
               
                //const delimiterIndex = lineText.indexOf('%%');

                // Vérifier si le texte contient "%%" et si le curseur est après
                
                gregkey.forEach(gregkeys => {
                        const item = new vscode.CompletionItem(gregkeys , vscode.CompletionItemKind.Text);
                        item.detail = 'Score keys';
                        item.documentation = gregkeys.documentation; // Détails supplémentaires
                        completionItems.push(item);
                });
                
                
                return completionItems;
            }
        }, ' ' )
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};