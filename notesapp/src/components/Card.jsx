import React from 'react';

function Card({ note, onEdit, onDelete }) {
  return (
    <div className="card card-border bg-white shadow-sm border border-gray-200 rounded-2xl transition duration-200 hover:shadow-md flex flex-col justify-between">
      <div className="card-body p-6">
        
        {/* Card Header */}
        <div className="flex justify-between items-start gap-4">
          <h2 className="card-title text-lg font-extrabold text-blue-700 tracking-tight line-clamp-2">
            {note.title}
          </h2>
          <span className="badge text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200/50 font-semibold shrink-0">
            Active
          </span>
        </div>
        
        {/* Card Content Body */}
        <p className="text-gray-600 leading-relaxed text-sm mt-3 break-words whitespace-pre-wrap">
          {note.description}
        </p>
        
        {/* Actions Footer Container */}
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-50">
            <button 
                onClick={() => onEdit(note)}
                className="btn btn-xs px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-bold border-none normal-case transition-colors"
            >
                Edit
            </button>
            <button 
                onClick={() => onDelete(note.id)}
                className="btn btn-xs px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-bold border-none normal-case transition-colors"
            >
                Delete
            </button>
        </div>
      </div>
    </div>
  );
}

export default Card;